# job-scheduler

Personal job scheduler

# Init

### Firewall

```
gcloud app firewall-rules create 1 \
--action=allow \
--source-range='0.1.0.1' \
--description='default -> deny, cron -> allow'
```

# Deploy

```
gcloud app deploy
gcloud app deploy cron.yaml
```

# TODO

* use dotenv

etc...
