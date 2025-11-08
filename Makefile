## ---------------------------------------------------------
## Variables base
## ---------------------------------------------------------
DOCKER_COMPOSE = docker compose -f ./.docker/docker-compose.yml
APP_DIR = /var/www/html
USER = pablogarciajc

## ---------------------------------------------------------
## Inicialización de la Aplicación
## ---------------------------------------------------------
.PHONY: init-app 
init-app: copy-env up npm-install npm-host

.PHONY: copy-env
copy-env:
	@ [ ! -f .env ] && cp .env.example .env || true

## ---------------------------------------------------------
## Gestión de Contenedores
## ---------------------------------------------------------
.PHONY: up
up: 
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down:
	$(DOCKER_COMPOSE) down

.PHONY: restart
restart:
	$(DOCKER_COMPOSE) restart

.PHONY: ps
ps:
	$(DOCKER_COMPOSE) ps

.PHONY: build
build:
	$(DOCKER_COMPOSE) build --no-cache

.PHONY: stop
stop:
	$(DOCKER_COMPOSE) stop

.PHONY: shell
shell:
	$(DOCKER_COMPOSE) exec --user $(USER) server_core bash

.PHONY: clean-project
clean-project:
	sudo docker rm -f gestor_de_tareas_solid_ts_server || true
	sudo docker rmi -f gestor_de_tareas_solid_ts_image || true
	sudo docker network rm gestor_de_tareas_solid_ts_network || true

## ---------------------------------------------------------
## Instalación y configuración del proyecto (Angular + npm)
## ---------------------------------------------------------

.PHONY: npm-install
npm-install:
	$(DOCKER_COMPOSE) exec --user $(USER) server_core bash -c \
		"cd $(APP_DIR) && npm install"
		
.PHONY: npm-host
npm-host:
	$(DOCKER_COMPOSE) exec --user $(USER) server_core bash -c \
		"cd $(APP_DIR) && npm run dev -- --host"

## ---------------------------------------------------------
## Compila el proyecto Angular para producción
## Genera la carpeta /dist con los archivos optimizados
## ---------------------------------------------------------
.PHONY: build-prod
build-prod:
	$(DOCKER_COMPOSE) exec --user $(USER) server_core bash -c \
		"cd $(APP_DIR) && npm run build"
