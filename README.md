# job-scheduler

Personal job scheduler automating some operations on browser.

# Jobs

### Regular

- Apply for IPO on SBI Securities / SBI証券サイトでのIPO申し込み
- Purchase Gold ETF on SBI Securities / 同、純金上場信託購入
- Entry point program on Shinsei Bank / 新生銀行のポイントプログラムエントリー
- Transfer repeatedly from SBI Sumishin Net Bank / 住信SBIネット銀行からの連続振込

### Unused

- Check cancellation of Hara Museum ticket / 原美術館のキャンセルチェック

### Future work

- Crowd Bankの残高が1万円以上か$100以上になったら通知

# Requirements

- GCP project
- Node.js
- yarn

# Init

### Setup

GCP:

```
gcloud services enable sheets.googleapis.com
```

install:

```
cd /path/to/repo
yarn
```

Environment variables:
setup `.env` file. Refer to `.env.example`

### Firewall

[Only allow api call from cron job](https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml#validating_cron_requests)

```
# NOTICE: other app engine services may be effected
gcloud app firewall-rules update default --action=deny
gcloud app firewall-rules create 1 \
--action=allow \
--source-range='0.1.0.2'
```

# Develop

### Commands

for production test:

```
yarn build
yarn start
```

for local:

```
# run app
yarn dev

# debug each job. TODO: macOS apple arch
yarn debug apply-for-ipo
```

# Deploy

- Deploy app: `make deploy`
- Deploy cron: `make cron`

# TODO

use secret manager for credential info
