FROM node:current-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY index.ts ./
COPY ./src ./src

## @todo it can't live at prod. Add compilation!
CMD npm run run-dev