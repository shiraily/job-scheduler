"use strict";

import express from "express";
import dotenv from "dotenv";
import { jobs } from "./job/jobs";

dotenv.config();

const app = express();

jobs.forEach(([path, job]) => {
  app.get(`/${path}`, (_, res, next) => {
    console.log(`requested: ${path}`);
    job.setup(job.constructor.name);
    job
      .handle()
      .then(() => {
        res
          .set(
            "Content-Type",
            typeof job.result === "string" ? "text/plain" : "image/png"
          )
          .status(200)
          .send(job.result)
          .end();
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
