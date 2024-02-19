FROM node:current-alpine

WORKDIR /app

RUN npm install -g parcel

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./src ./src
COPY ./index.html ./
COPY .proxyrc.js ./

CMD parcel ./index.html
