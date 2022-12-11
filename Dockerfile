
# Production Build

# Stage 1: Build react client
FROM node:10.16-alpine as client

# Working directory be app
WORKDIR /packages/client/

COPY client/package*.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY client/ ./

RUN npm build

# Stage 2 : Build Server

FROM node:10.16-alpine

WORKDIR /packages/server/
COPY --from=client /package/client/build/ ./client/build/

WORKDIR /packages/server/
COPY server/package*.json ./
RUN npm install -qy
COPY server/ ./

ENV PORT 27017

EXPOSE 27017

CMD ["npm", "start"]
