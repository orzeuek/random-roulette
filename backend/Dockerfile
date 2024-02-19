FROM node:current-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY index.ts ./
COPY ./src ./src

CMD node ./index.ts