'use strict';

import express from "express";
import { applyIPO } from "./apply_ipo";

// TODO
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get('/apply-ipo', (_, res, next) => {
  console.log("requested");
  applyIPO().then(
    () => res.status(200).send('OK').end()
  ).catch(next);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
