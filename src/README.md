# pronovostroiki

## Build Setup

```bash
# install dependencies
yarn install

# serve with hot reload at localhost:3000
yarn dev

# build for production and launch server
yarn build
yarn start

# generate static project
yarn generate
```

## Run in docker container

Unpack project by [instruction](https://gitlab.com/sellmore-moscow/pronovostroyki/infra)

Run docker compose and attach to container:
```bash
# Attache container from infra folder
docker-compose exec frontend /bin/sh

# Run yarn
yarn

# Run dev mode
yarn dev
```