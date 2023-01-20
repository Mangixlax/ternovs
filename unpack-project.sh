#!/usr/bin/env bash

cp .env.example .env

echo "USER=$USER" >> .env

docker-compose up -d

docker-compose exec frontend yarn

docker-compose down

echo "Unpack process finished"
