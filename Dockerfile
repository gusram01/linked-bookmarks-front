# ---- Base Stage ----
FROM node:lts-alpine AS base

WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS prod-deps
COPY package.json package-lock.json* ./
COPY .env ./
RUN npm ci --omit=dev

# ---- Build Stage ----
FROM base AS build
COPY package.json package-lock.json* ./
COPY .env ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM base AS production

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY ecosystem.config.cjs .
COPY ./.env ./.env
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/package.json ./package.json
COPY --from=build /app/dist ./dist

EXPOSE 4321
CMD ["npm", "start"]