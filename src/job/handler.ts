import https from "https";
import { Browser, Page } from "puppeteer";
import { getBrowser } from "../common/puppeteer";

export abstract class JobHandler {
  private jobName: string;
  protected browser: Browser;
  protected page: Page;

  // constructor cannot refer to concrete class name
  setup(jobName: string) {
    this.jobName = jobName;
  }

  async handle() {
    await this.createNewPage();
    let msg = "";
    try {
      msg = await this.operate();
    } catch(e) {
      msg = `失敗しました。 job=${this.jobName}, ${e}`;
      console.log("error", e);
    }
    this.notify(msg);
  }

  private async createNewPage() {
    const browser = await getBrowser();
    this.page = await browser.newPage();   
    this.page.setViewport({width: 1280, height: 720});
  }

  abstract operate(): Promise<string>;

  notify(text: string) {
    if (!text) return;

    const data = JSON.stringify({username: "bot", icon_emoji: ":ghost:", text});  
    const options = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: process.env.SLACK_WEBHOOK,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };
    const req = https.request(options, (res) =>{
      if(res.statusCode===200){
          console.log("OK:"+res.statusCode);
      }else{
          console.log("Status Error:"+res.statusCode);
      }
    });
    req.on('error',(e)=>{
        console.error(e);
    });
  
    req.write(data);
    req.end();
  }
}