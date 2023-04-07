# generic image with node and npm
FROM node:17-alpine AS base

WORKDIR /usr/local/app
RUN npm install -g npm@8.1.0

# image with package.json and cached node_modules
# useful for test containers or an express server with prod only modules
FROM base AS npmmodules
COPY frontend/package*.json ./
RUN npm install

# image for building everything (so runtime is thinner)
FROM npmmodules as builder
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/.env ./.env