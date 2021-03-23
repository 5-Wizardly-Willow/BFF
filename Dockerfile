FROM node:14.16.0-alpine3.10

WORKDIR /apps/bff

COPY package.json ./
COPY . .

RUN npm install
EXPOSE 5000

CMD ["node", "src/server.js"]