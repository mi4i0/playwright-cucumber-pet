E2E_PROFILE?=dev

install-e2e-dependencies:
	yarn install --cwd e2e

run-e2e:
	yarn --cwd e2e/ cucumber --profile $(E2E_PROFILE) || yarn --cwd e2e/ postcucumber

start:
	yarn start

docker-build:
	docker build -t sample:dev .
docker-run:
	docker run -d \
        -it \
        --rm \
        -v ${PWD}:/app \
        -v /app/node_modules \
        -p 3000:3000 \
        -e CHOKIDAR_USEPOLLING=true \
        sample:dev