FROM node:22-alpine

WORKDIR /server

COPY ./package*.json ./

RUN npm ci

COPY ./index.js ./

ENTRYPOINT ["node", "index.js"]
