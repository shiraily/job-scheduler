'use strict';

import express from "express";
import { applyIPO } from "./apply_ipo";

// TODO
import dotenv from "dotenv";
dotenv.config();

console.log("initializing..", process.env.SBI_USERNAME);

// [START gae_node_request_example]
//const { applyIPO } = require('./src/apply_ipo.js');

const app = express();

app.get('/apply-ipo', (_, res) => {
  applyIPO();
  res.status(200).send('OK').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;
