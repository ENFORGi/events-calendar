FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install -g serve && npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist", "-l", "3000" ]