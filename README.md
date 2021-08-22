# job-scheduler

Personal job scheduler automating some operations on browser.

# Jobs

### Regular

- SBI証券サイトでのIPO申し込み
- 新生銀行のポイントプログラムエントリー

### Unused

- 原美術館のキャンセルチェック

# Requirements

- GCP project
- node.js

# Init

### Install

```
cd /path/to/repo
npm i
```

### Commands

Setup .env file then start app

```
npm run build
npm run start
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

```
gcloud app deploy --version=1 --quiet
gcloud app deploy cron.yaml --quiet
```

# TODO

* use dotenv

etc...
