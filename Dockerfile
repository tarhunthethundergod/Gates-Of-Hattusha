FROM node:20

WORKDIR /opt

COPY server.js .env ./
COPY package.json package-lock.json ./

COPY public public
COPY views views

RUN npm install

EXPOSE ${Port}

CMD [ "node", "server.js" ]