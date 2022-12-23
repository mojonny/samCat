FROM node:14

WORKDIR /packages/server/
COPY package.json .
RUN npm install
RUN npm run seed:database
COPY . .
CMD npm start
