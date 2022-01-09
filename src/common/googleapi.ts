"use strict";

import dotenv from "dotenv";
import { google, Auth } from "googleapis";
import { CredentialBody } from "google-auth-library";
import clientSecret from "../../client_secret.json";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const credentials = clientSecret as CredentialBody;

const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES,
  null
);

write(client, ["1", "2", "3", "4", "5", "6"]);

/**
 * sample code to list google sheet range
 */
export function listMajors(auth: Auth.OAuth2Client) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "CrowdBank!A1",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log("Name, Major:");
        rows.map((row) => {
          console.log(`${row[0]}`);
        });
      } else {
        console.log("No data found.");
      }
    }
  );
}

/**
 * write row to google sheet
 */
export function write(auth: Auth.OAuth2Client, row: string[]) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.update(
    {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "CrowdBank!A1:F1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      console.log(`${res.data}`);
    }
  );
}
