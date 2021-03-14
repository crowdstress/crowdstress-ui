FROM node:alpine AS builder
WORKDIR /app
ADD . .
ARG NPM_TOKEN
RUN npm set //npm.pkg.github.com/:_authToken $NPM_TOKEN
RUN npm install && npm run build:prod

FROM nginx AS bundler
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build ./build
