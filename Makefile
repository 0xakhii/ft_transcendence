start:
	docker-compose build && docker-compose up
down:
	docker-compose down
restart:
	docker-compose down && docker-compose up
build:
	docker-compose build
up:
	docker-compose up
stop:
	docker-compose stop
rm:
	docker-compose rm
logs:
	docker-compose logs
ps:
	docker-compose ps