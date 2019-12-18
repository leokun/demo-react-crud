up: install
	docker-compose up --build

install:
	docker-compose run --rm nodejs yarn install

PACKAGE?=
add:
	docker-compose run --rm nodejs yarn add $(PACKAGE)


build:
	docker-compose run --rm nodejs yarn build

serve:
	docker-compose run --rm nodejs serve -s build

