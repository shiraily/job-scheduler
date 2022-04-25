import https from "https";
import { Browser, Page, ElementHandle, errors } from "puppeteer";
import { getBrowser } from "../common/puppeteer";

export abstract class JobHandler {
  private jobName: string;
  protected browser: Browser;
  protected page: Page;
  result: string | Buffer = "OK";

  // constructor cannot refer to concrete class name
  setup(jobName: string) {
    this.jobName = jobName;
  }

  async handle() {
    await this.createNewPage();
    let msg = "";
    try {
      msg = await this.operate();
    } catch (e) {
      msg = `失敗しました。 job=${this.jobName}, ${e}`;
      this.result = await this.page.screenshot();
      console.log("error", e);
    } finally {
      await this.browser.close();
    }
    this.notify(msg);
  }

  private async createNewPage() {
    this.browser = await getBrowser();
    this.page = await this.browser.newPage();
    this.page.setViewport({ width: 1280, height: 720 });
  }

  abstract operate(): Promise<string>;

  // TODO 類似メソッドが増えたら再設計
  async contains(
    element: string,
    text: string,
    index = 0
  ): Promise<ElementHandle<Element>> {
    const xpath = `//${element}[text() = "${text}"]`;
    await this.page.waitForXPath(xpath);
    return (await this.page.$x(xpath))[index];
  }

  async goto(url: string) {
    try {
      await this.page.goto(url, { timeout: 1_000 });
    } catch (e) {
      if (!(e instanceof errors.TimeoutError)) {
        throw e;
      }
    }
  }

  async waitForType(selector: string, text: string) {
    await (await this.page.waitForSelector(selector)).type(text);
  }

  notify(text: string) {
    if (!text) return;

    const data = JSON.stringify({
      username: "bot",
      icon_emoji: ":ghost:",
      text,
    });
    const options = {
      hostname: "hooks.slack.com",
      port: 443,
      path: process.env.SLACK_WEBHOOK,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log("OK:" + res.statusCode);
      } else {
        console.log("Status Error:" + res.statusCode);
      }
    });
    req.on("error", (e) => {
      console.error(e);
    });

    req.write(data);
    req.end();
  }
}
