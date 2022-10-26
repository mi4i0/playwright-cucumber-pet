cucumber-dev:
	yarn --cwd e2e/ cucumber:dev

start:
	yarn start

docker-build:
	docker build -t sample:dev .
docker-run:
	docker run \
        -it \
        --rm \
        -v ${PWD}:/app \
        -v /app/node_modules \
        -p 3000:3000 \
        -e CHOKIDAR_USEPOLLING=true \
        sample:dev