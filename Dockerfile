FROM node:18.13-alpine3.16

ARG USER=node
ARG UID=1000
ARG GID=1000

RUN apk add --update supervisor curl yarn

RUN mkdir -p /var/www/html/frontend

COPY ./src/docker/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY ./src /var/www/html/frontend

RUN rm -rf /var/www/html/frontend/node_modules

RUN chown -R ${UID}:${GID} /var/www/html/frontend \
    && chmod -R 775 /var/www/html/frontend \
    && chown -R ${UID}:${GID} /run

# Switch to use a non-root user from here on
USER ${UID}:${GID}

WORKDIR /var/www/html/frontend

ENV HOST 0.0.0.0

ENV NODE_OPTIONS='--openssl-legacy-provider --max-old-space-size=4096'

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
