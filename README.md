# job-scheduler

Personal job scheduler to operate browsers

# Jobs

- Apply IPO of SBI securities daily
- (wip) Apply Go To Eat Tokyo

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
gcloud app deploy --version=1
gcloud app deploy cron.yaml
```

# TODO

* use dotenv

etc...
