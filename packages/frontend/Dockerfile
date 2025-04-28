FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx expo export --platform web

RUN npm install -g serve

EXPOSE 8081

CMD ["serve", "-s", "dist", "-l", "8081"]