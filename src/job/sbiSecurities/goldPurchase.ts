import { setTimeout } from "timers/promises";
import { SBIBase } from "./base";

/** 取引単位（株） */
const unit = 1;

/**
 * IPO申し込みをすることでIPOチャレンジポイントを取得する
 */
export class GoldPurchase extends SBIBase {
  async sub(): Promise<string> {
    console.log("start purchasing gold");
    await this.page.waitForSelector("img", { timeout: 5000 });
    await this.page.goto(
      "https://site1.sbisec.co.jp/ETGate/?_ControlID=WPLETstT002Control&_PageID=DefaultPID&_ActionID=DefaultAID&stock_sec_code=1540&stock_sec_code_mul=1540",
      {
        waitUntil: "domcontentloaded",
      }
    );
    const quantitySelector = "input[name=input_quantity]";
    await this.page.waitForSelector(quantitySelector, { timeout: 5000 });
    await this.page.type(quantitySelector, unit.toString());
    await this.page.click("input[id=nariyuki]");
    await this.page.type(
      "input[name=trade_pwd]",
      process.env.SBI_TRADE_PASSWORD
    );
    const price = await (
      await this.page.waitForSelector("span[id=HiddenTradePrice]")
    ).evaluate((e) => e.textContent);
    await this.page.click("input[name=skip_estimate]");
    await setTimeout(500);
    await this.page.click("img[alt=注文発注]");
    await setTimeout(1000);
    await this.contains("b", "ご注文を受け付けました。");
    await this.page.waitForSelector("b", { timeout: 5000 });
    console.log(`Purchase gold at ${price}`);
    return `純金上場信託を ${price} 円で購入しました`;
  }
}
