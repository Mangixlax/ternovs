#!/usr/bin/env bash

echo "Configuration setup started"

cp .env.example .env
cp ./src/.env.example ./src/.env

echo "USER=$USER" >> .env

docker-compose up -d

docker-compose exec frontend yarn

docker-compose down

echo "Configuration setup completed"
