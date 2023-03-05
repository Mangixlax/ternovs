# Проект: Ternovs / Стоматология

## Тип: Frontend

## Стэк: NuxtJS v2

## Для чего здесь Docker?

`Dockerfile.prod` - используется в сборке проекта для боевой версии.

`Dockerfile.dev` - используется в сборке проекта для старта разработки локально.

## Какая версия Docker Compose нужна?

Для нормального запуска и работы с проектом, рекомендуем использовать Docker Compose v2.

### Подготовка к запуску проекта

```shell
bash pre-conf.sh
docker compose up -d
```

### Запуск в режиме разработки

Не забудьте поменять `APP_ENV` в `.env` с `production` на `local`

```shell
docker compose exec frontend yarn dev
```

### Запуск в боевом режиме на локальной машине

Не забудьте поменять `APP_ENV` в `.env` с `local` на `production`

```shell
docker compose exec frontend yarn build
docker compose exec frontend yarn start
```

## Запуск в докер контейнере

```shell
docker compose up -d
```





