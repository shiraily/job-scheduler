import { JobHandler } from "./handler";
import { setTimeout } from "timers/promises";
import { getClient, write } from "../common/googleapi";

const fields = [
  ".tag-category__region",
  "h2 a",
  ".fund-list-item__rate .fund-list-item__text",
  ".fund-list-item__term .fund-list-item__text",
  ".fund-list-item__limit-unit .fund-list-item__text",
  ".fund-list-item__text.fund-list-item__text--small.fund-list-item__text--block",
];

/**
 * CrowdBankで募集中のファンド一覧を取得する
 */
export class ListCrowdBankFunds extends JobHandler {
  async operate(): Promise<string> {
    const urlParam =
      process.env.NODE_ENV !== "development"
        ? "?word=&region=all&project=all&status=21&page=1&direction=desc"
        : "";
    this.page.goto(`https://crowdbank.jp/funds/search/${urlParam}`);
    await setTimeout(3000);
    console.log("starting...");

    const data = [];
    for (const li of await this.page.$$(".fund-list-items li")) {
      const values = await Promise.all(
        fields.map(async (field) => {
          return (await li.waitForSelector(field)).evaluate(
            (el) => el.textContent
          );
        })
      );
      data.push(values);
    }

    write(getClient(), data);
    return `募集中のファンドがありました!`;
  }
}
