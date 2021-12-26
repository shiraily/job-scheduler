import puppeteer from "puppeteer";
import { headless } from "./constant";

export async function getBrowser(): Promise<puppeteer.Browser> {
  return await puppeteer.launch(
    {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '-–disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
      ],
      headless,
    }
  );
}
