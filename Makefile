E2E_PROFILE?=dev
NODE_ENV?=localhost

install-e2e-dependencies:
	yarn install --cwd e2e

run-e2e:
	chmod +x ./e2e/run_tests.sh
	./e2e/run_tests.sh $(NODE_ENV) $(E2E_PROFILE)

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