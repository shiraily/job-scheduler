"use strict";

import express from "express";
import { JobHandler } from "./job/handler";
import { ShinseiBankEntry } from "./job/shinseiBankEntry";
import { IPOApplication } from "./job/applyIPO";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const jobs: [path: string, job: JobHandler][] = [
  ["apply-ipo", new IPOApplication()],
  ["entry-shinsei-bank", new ShinseiBankEntry()],
  // TODO just login to Shinsei Bank
  // TODO apply CrowdBank Fund
];

jobs.forEach(([path, job]) => {
  app.get(`/${path}`, (_, res, next) => {
    console.log(`requested: ${path}`);
    job.setup(job.constructor.name);
    job
      .handle()
      .then(() => {
        res.status(200).send("OK").end();
        SERVER.close();
      })
      .catch(next);
  });
});

const PORT = process.env.PORT || 8000;
const SERVER = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
