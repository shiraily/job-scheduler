import { IPOApplication } from "./sbiSecurities/applyIPO";
import { ShinseiBankEntry } from "./shinseiBankEntry";
import { TransferFromSumishin } from "./transferFromSumishin";
import { JobHandler } from "./handler";
import { CrowdBankFundsApplicant } from "./crowdBank";
import { GoldPurchase } from "./sbiSecurities/goldPurchase";

export const jobs: [path: string, job: JobHandler][] = [
  ["apply-for-ipo", new IPOApplication()],
  ["purchase-gold", new GoldPurchase()],
  ["entry-shinsei-bank", new ShinseiBankEntry()],
  ["transfer-from-sumishin", new TransferFromSumishin()],
  ["list-crowd-bank-funds", new CrowdBankFundsApplicant()],
  // TODO just login to Shinsei Bank
  // TODO apply CrowdBank Fund
];
