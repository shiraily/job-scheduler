//import { TimeoutError } from "puppeteer";
import { setTimeout } from "timers/promises";
import { JobHandler } from "./handler";

export class TransferFromSumishin extends JobHandler {
  async operate(): Promise<string> {
    await this.goto(
      "https://www.netbk.co.jp/contents/pages/wpl010101/i010101CT/DI01010210"
    );
    await this.waitForType(
      "input[name=userNameNewLogin]",
      process.env.SUMISHIN_USERNAME
    );
    await this.page.type(
      "input[id=loginPwdSet]",
      process.env.SUMISHIN_PASSWORD
    );
    await this.page.click("button[type=submit]");

    // 他行宛振込回数取得
    await setTimeout(2000);
    const text = await (
      await this.page.waitForSelector(
        "div.top-personal-remain-other > a > span.m-txtEx"
      )
    ).evaluate((el) => el.textContent);
    const remainTransfer = Math.min(parseInt(text) || 0, 4);
    console.log("remaining transfer:", remainTransfer);

    let n = 0;
    while (n < remainTransfer) {
      await setTimeout(2000);
      await (
        await this.page.waitForXPath(
          "//span[@class='m-icon-ps_furikomi']//parent::a"
        )
      ).click();

      const xpath = `//li[contains(., '${process.env.SUMISHIN_DEST_ACCOUNT}')]/div/ul/a`;
      await this.page.waitForXPath(xpath);
      (await this.page.$x(xpath))[0].click();

      // 振込確認・実行
      await (
        await this.page.waitForSelector("input[id=tfrAmt0]")
      ).type("10000");
      (await this.contains("span", "確認する")).click();
      (await this.contains("span", "スマート認証NEO")).click();
      await this.contains("h1", "登録先への振込完了", 0, 30_000);
      n += 1;
    }
    return n == 0
      ? "他行宛振込無料回数が残っていません"
      : `${n}件の振込を行いました。`;
  }
}
