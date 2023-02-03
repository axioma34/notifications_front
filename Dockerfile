FROM node:17.5.0-alpine3.15 as build

RUN apk update && apk add curl git

COPY . /app
WORKDIR /app
RUN yarn && yarn build
ENTRYPOINT ["yarn", "serve"]

EXPOSE 8081
