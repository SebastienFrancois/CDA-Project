FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i yarn
RUN yarn install
COPY . /app
RUN yarn run build