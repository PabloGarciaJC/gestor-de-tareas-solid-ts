## ---------------------------------------------------------
## Imagen base
## ---------------------------------------------------------
FROM node:20-alpine

## ---------------------------------------------------------
## Variables
## ---------------------------------------------------------
ARG USERNAME=pablogarciajc

## ---------------------------------------------------------
## Instalación de herramientas básicas
## ---------------------------------------------------------
RUN apk add --no-cache bash sudo shadow

## ---------------------------------------------------------
## Permisos sudo para el usuario por defecto 'node'
## ---------------------------------------------------------
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

## ---------------------------------------------------------
## Cambiar nombre visible del usuario y su grupo
## ---------------------------------------------------------
RUN usermod -l ${USERNAME} node && \
    usermod -d /home/${USERNAME} -m ${USERNAME} && \
    groupmod -n ${USERNAME} node

## ---------------------------------------------------------
## Copiar archivos de configuración bash al contenedor
## ---------------------------------------------------------
COPY ./server_core/bash/terminal /etc/terminal
COPY ./server_core/bash/sudo-user /etc/sudoers.d/sudo-user
RUN chmod 0440 /etc/sudoers.d/sudo-user

## ---------------------------------------------------------
## Configurar bash para cargar /etc/terminal al iniciar
## ---------------------------------------------------------
RUN echo ". /etc/terminal" | tee -a /home/${USERNAME}/.bashrc /root/.bashrc \
    && chown ${USERNAME}:${USERNAME} /home/${USERNAME}/.bashrc

## ---------------------------------------------------------
## Instalar Angular CLI globalmente
## ---------------------------------------------------------
RUN npm install -g @angular/cli

## ---------------------------------------------------------
## Directorio de trabajo y puerto expuesto
## ---------------------------------------------------------
WORKDIR /var/www/html
EXPOSE 5173

## ---------------------------------------------------------
## Usar el usuario renombrado
## ---------------------------------------------------------
USER ${USERNAME}

## ---------------------------------------------------------
## Mantener el contenedor activo
## ---------------------------------------------------------
CMD ["tail", "-f", "/dev/null"]
