include .env

deploy:
	gcloud app deploy --version 1 --project $(PROJECT) --quiet

cron:
	gcloud app deploy cron.yaml --project $(PROJECT) --quiet
