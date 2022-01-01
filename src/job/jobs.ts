import { IPOApplication } from "./applyIPO";
import { ShinseiBankEntry } from "./shinseiBankEntry";
import { TransferFromSumishin } from "./transferFromSumishin";
import { JobHandler } from "./handler";

export const jobs: [path: string, job: JobHandler][] = [
  ["apply-ipo", new IPOApplication()],
  ["entry-shinsei-bank", new ShinseiBankEntry()],
  ["transfer-from-sumishin", new TransferFromSumishin()],
  // TODO just login to Shinsei Bank
  // TODO apply CrowdBank Fund
];
