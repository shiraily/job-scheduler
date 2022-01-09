"use strict";

import { google, Auth } from "googleapis";
import { CredentialBody } from "google-auth-library";
import clientSecret from "../../client_secret.json";

export function getClient() {
  const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
  const credentials = clientSecret as CredentialBody;

  return new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    SCOPES,
    null
  );
}

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

const numHeaderRow = 1;

/**
 * write row to google sheet
 */
export function write(auth: Auth.OAuth2Client, values: string[][]) {
  const lastRow = values.length + numHeaderRow;
  const lastCol = String.fromCharCode(values[0].length + "A".charCodeAt(0));

  google.sheets({ version: "v4", auth }).spreadsheets.values.update(
    {
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `CrowdBank!A${numHeaderRow + 1}:${lastCol}${lastRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      console.log(`${res.data}`);
    }
  );
}

/*write(getClient(), [
  ["1", "2", "3", "4", "5", "6"],
  ["1", "2", "3", "4", "5", "6"],
]);*/
