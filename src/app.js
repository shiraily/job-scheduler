'use strict';

import express from "express";
import { applyIPO } from "./apply_ipo";
import { detectHaraMuseumCancel } from "./detect_hara_museum_cancel";

// TODO
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get('/apply-ipo', (_, res, next) => {
  console.log("requested");
  applyIPO().then(
    () => {
      res.status(200).send('OK').end();
      SERVER.close();
    }
  ).catch(next);
});

app.get('/detect-hara-museum-cancel', (_, res, next) => {
  console.log("requested");
  detectHaraMuseumCancel().then(
    () => {
      res.status(200).send('OK').end();
      SERVER.close();
    }
  ).catch(next);
});

const PORT = process.env.PORT || 8000;
const SERVER = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
