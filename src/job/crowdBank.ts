import { JobHandler } from "./handler";

/**
 * CrowdBankで募集中のファンド一覧を取得する
 */
export class ListCrowdBankFunds extends JobHandler {
  async operate(): Promise<string> {
    return `募集中のファンドが有りました!`;
  }
}
