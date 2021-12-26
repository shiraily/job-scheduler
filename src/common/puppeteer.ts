import puppeteer from "puppeteer";

export const getBrowser = async () => {
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
    }
  );
}
