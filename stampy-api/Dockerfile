FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY ./dist .
CMD [ "node", "main.js" ]