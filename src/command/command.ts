"use strict";

import dotenv from "dotenv";
import { exit } from "process";
import { jobs } from "../job/jobs";

dotenv.config();

const pathJob = jobs.find((x) => x[0] === process.argv[2]);

if (!pathJob) {
  console.error(`job not found`);
  exit();
}
const [, job] = pathJob;

job.setup(job.constructor.name);
job
  .handle()
  .then(() => {
    console.log("OK");
  })
  .catch((e: Error) => {
    console.error(e);
  });
