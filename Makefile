NETWORK_NAME = ternovs_net
NGINX_CONTAINER_NAME = frontend

TAG = registry.gitlab.com/sabr-ci/ternovs/frontend:latest

docker-build:
	docker build --file ./Dockerfile.prod --tag $(TAG) .

docker-publish: docker-build
	docker push $(TAG)
	$(info "docker pull $(TAG); docker stop $(NGINX_CONTAINER_NAME); docker rm $(NGINX_CONTAINER_NAME); docker run -d --network $(NETWORK_NAME) --restart unless-stopped --name $(NGINX_CONTAINER_NAME) $(TAG)")

dev:
	docker compose -f ./../../docker-compose.yml exec frontend yarn dev

analyze:
	docker compose -f ./../../docker-compose.yml exec frontend yarn analyze

build:
	docker compose -f ./../../docker-compose.yml exec frontend yarn build

build-start: build
	docker compose -f ./../../docker-compose.yml exec frontend yarn start