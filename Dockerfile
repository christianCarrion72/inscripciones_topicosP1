# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./

# Instalar dependencias y construir la aplicación
RUN yarn install && \
    yarn cache clean

COPY . .
RUN yarn build

# Etapa de producción
FROM node:18-alpine AS production

WORKDIR /app

# Copiar solo los archivos necesarios
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY .env ./

# Instalar solo las dependencias de producción
RUN yarn install --production --frozen-lockfile && \
    yarn cache clean

# Configurar usuario no root por seguridad
USER node

EXPOSE 3000
CMD ["node", "dist/main"]
