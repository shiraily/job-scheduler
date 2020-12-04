# job-scheduler

Personal job scheduler

# Init

### Firewall

only allow api call from cron job
https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml#validating_cron_requests

```
gcloud app firewall-rules update default --action=deny
gcloud app firewall-rules create 1 \
--action=allow \
--source-range='10.0.0.1' \
gcloud app firewall-rules create 2 \
--action=allow \
--source-range='0.1.0.1' \
```

# Deploy

```
gcloud app deploy --version=1
gcloud app deploy cron.yaml
```

# TODO

* use dotenv

etc...
