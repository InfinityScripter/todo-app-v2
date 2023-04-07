# generic image with node and npm
FROM node:17-alpine AS base

WORKDIR /usr/local/app
RUN npm install -g npm@8.1.0

# image with package.json and cached node_modules
# useful for test containers or an express server with prod only modules
FROM base AS npmmodules
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

# image for building everything (so runtime is thinner)
FROM npmmodules as builder
COPY src ./src
COPY public ./public
COPY .env ./.env
RUN npm run build


# release/runtime only container
FROM nginx:1.21-alpine

COPY --from=builder /usr/local/app/build /usr/share/nginx/html
COPY proxy.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]