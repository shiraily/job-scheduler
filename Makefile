deploy:
	gcloud app deploy --version=1 --quiet

cron:
	gcloud app deploy cron.yaml --quiet