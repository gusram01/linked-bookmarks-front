FROM node:22-slim AS build

WORKDIR /app

RUN npm cache clean --force

COPY package*.json ./

RUN npm ci --no-progress --loglevel=error --ignore-scripts

COPY . .
COPY ./.env ./

RUN node --run build

## Production stage
FROM nginx:1.28-alpine3.21
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80