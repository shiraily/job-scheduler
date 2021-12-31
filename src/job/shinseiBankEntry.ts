import { JobHandler } from "./handler";

export class ShinseiBankEntry extends JobHandler {
  async operate(): Promise<string> {
    console.log("start inputting Shinsei Bank entry");
    await this.page.goto("https://webform.shinseibank.com/webapp/form/19913_xldb_4/index.do?lid=p");
    await this.page.type("#fi_account_num", process.env.SHINSEI_ACCOUNT);
    await this.page.type("#fi_birth_year", process.env.BIRTH_YEAR);
    await this.page.type("#fi_birth_month", process.env.BIRTH_MONTH);
    await this.page.type("#fi_birth_day", process.env.BIRTH_DAY);
  
    await this.page.type("#fi_point_t16", process.env.T_POINT);
    await this.page.type("#fi_mail", process.env.EMAIL_ADDRESS);
  
    await this.page.click("label[for=fi_policy]");
    await this.page.click("input[type=submit]");
  
    await this.page.waitForTimeout(3000);
    await this.page.click("input[type=submit]");
    await this.page.waitForTimeout(3000);
    const title = await this.page.title();
  
    const isEntrySucceeded = title.indexOf("エントリー完了") !== -1;
    console.log("success?", isEntrySucceeded);
    return `新生銀行のポイントプログラムエントリー結果: ${isEntrySucceeded}`;
  }
}
