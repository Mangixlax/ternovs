FROM nginx:1.19.10

RUN mkdir -p /data/nginx/cache
RUN mkdir -p /var/logs/nginx

COPY nginx.conf /etc/nginx/
COPY conf.d/ternovs.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

STOPSIGNAL SIGTERM

WORKDIR /var/www/html/frontend

CMD ["nginx", "-g", "daemon off;"]
