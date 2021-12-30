import puppeteer from "puppeteer";
import { JobHandler } from "./handler";

/** 取引単位（株） */
const unit = 100;

export class IPOApplication extends JobHandler {
  async operate(): Promise<string> {
    console.log("start applying IPO");
    await this.page.goto("https://www.sbisec.co.jp/");
    await this.page.type("input[name=user_id]", process.env.SBI_USERNAME);
    await this.page.type("input[name=user_password]", process.env.SBI_PASSWORD);
  
    await this.page.click("input[name=ACT_login]");
  
    let n = 0;
    while (n < 5) {
      await this.page.waitForSelector("img", {timeout: 5000});
      await this.page.goto("https://m.sbisec.co.jp/oeliw011?type=21", { waitUntil: "domcontentloaded" });
  
      let canApply = true;
      await this.page.waitForSelector("img[alt=申込]", {timeout: 5000}).catch((e) => {
        if (!(e instanceof puppeteer.errors.TimeoutError)) {
          console.error(e);
        }
        canApply = false;
      });
      if (!canApply) {
        console.log("no more BB");
        break;
      };
      await this.page.click("img[alt=申込]");
  
      await this.page.waitForSelector("input[name=suryo]", {timeout: 5000});
      await this.page.type("input[name=suryo]", unit.toString());
      await this.page.click("#strPriceRadio");
      await this.page.type("input[name=tr_pass]", process.env.SBI_TRADE_PASSWORD);
      await this.page.click("input[name=order_kakunin]");
      await this.page.waitForTimeout(1000);
  
      await this.page.click("input[name=order_btn]");
      console.log(`apply ${n}`);
      n += 1;
    }
    return n == 0? null: `${n}件のIPO申込を行いました`;
  }
}