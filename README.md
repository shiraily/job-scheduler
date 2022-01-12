# job-scheduler

Personal job scheduler automating some operations on browser.

# Jobs

### Regular

- SBI証券サイトでのIPO申し込み
- 新生銀行のポイントプログラムエントリー
- 住信SBIネット銀行からの連続振込

### Unused

- 原美術館のキャンセルチェック

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

### Commands

Need to setup .env file.

for production test:

```
yarn build
yarn start
```

for local:

```
# run app
yarn dev

# debug each job
yarn debug apply-for-ipo
```

### Firewall

Only allow api call from cron job
https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml#validating_cron_requests

```
gcloud app firewall-rules update default --action=deny
gcloud app firewall-rules create 1 \
--action=allow \
--source-range='10.0.0.1'
gcloud app firewall-rules create 2 \
--action=allow \
--source-range='0.1.0.1'
```

# Deploy

- Deploy app: `make deploy`
- Deploy cron: `make cron`

# TODO

use secret manager for credential info
