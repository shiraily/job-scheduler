import puppeteer from "puppeteer";
import { JobHandler } from "./handler";

/** 取引単位（株） */
const unit = 100;

/**
 * IPO申し込みをすることでIPOチャレンジポイントを取得する
 */
export class IPOApplication extends JobHandler {
  async operate(): Promise<string> {
    console.log("start applying IPO");
    await this.goto("https://www.sbisec.co.jp/");
    await this.waitForType("input[name=user_id]", process.env.SBI_USERNAME);
    await this.page.type("input[name=user_password]", process.env.SBI_PASSWORD);
    await this.page.click("input[name=ACT_login]");

    const companies: string[] = [];
    while (companies.length < 5) {
      await this.page.waitForSelector("img", { timeout: 5000 });
      await this.page.goto("https://m.sbisec.co.jp/oeliw011?type=21", {
        waitUntil: "domcontentloaded",
      });

      const imgSelector = "img[alt=申込]";

      let canApply = true;
      const applyBtn = (await this.page
        .waitForSelector(imgSelector, { timeout: 5000 })
        .catch((e) => {
          if (!(e instanceof puppeteer.errors.TimeoutError)) {
            console.error(e);
          }
          canApply = false;
        })) as puppeteer.ElementHandle<HTMLImageElement>;
      if (!canApply) {
        console.log("no more BB");
        break;
      }
      const companyName =
        (await (
          await applyBtn.$x("../../../..//tr/td")
        )[0].evaluate((e) => e.textContent)) || "";
      companies.push(companyName);

      await this.page.click(imgSelector);

      await this.page.waitForSelector("input[name=suryo]", { timeout: 5000 });
      await this.page.type("input[name=suryo]", unit.toString());
      await this.page.click("#strPriceRadio");
      await this.page.type(
        "input[name=tr_pass]",
        process.env.SBI_TRADE_PASSWORD
      );
      await this.page.click("input[name=order_kakunin]");
      await this.page.waitForTimeout(1000);

      await this.page.click("input[name=order_btn]");
      console.log(`apply ${companies.length}`);
    }

    const numCompanies = companies.length;
    return numCompanies == 0
      ? null
      : `${numCompanies}件のIPO申込を行いました:\n${companies.join("\n")}`;
  }
}
