import { JobHandler } from "../handler";

/**
 * IPO申し込みをすることでIPOチャレンジポイントを取得する
 */
export abstract class SBIBase extends JobHandler {
  async login() {
    try {
      await this.goto("https://www.sbisec.co.jp/");
      await this.waitForType("input[name=user_id]", process.env.SBI_USERNAME);
      await this.page.type(
        "input[name=user_password]",
        process.env.SBI_PASSWORD
      );
      await this.page.click("input[name=ACT_login]");
    } catch (e) {
      console.error("login failed", e);
      throw e;
    }
    console.log("login success");
  }

  async operate(): Promise<string> {
    await this.login();
    return await this.sub();
  }

  abstract sub(): Promise<string>;
}
