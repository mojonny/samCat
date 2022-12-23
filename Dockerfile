FROM node:14

WORKDIR /packages/server/
COPY package.json .
RUN npm install
COPY . .
CMD npm start
