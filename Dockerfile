FROM arm32v7/node:15-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 8080