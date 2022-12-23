FROM node:14

WORKDIR /packages/server/
COPY package.json .
RUN npm run seed:database
RUN npm install
COPY . .
CMD npm start
