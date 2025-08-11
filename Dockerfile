FROM node:24-bullseye-slim

WORKDIR /code

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD [ "npm", "run", "build" ]