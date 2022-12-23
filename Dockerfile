FROM node:16.13.0


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install -g npm@9.2.0
RUN npm install husky -g
RUN npm run install:all

EXPOSE 3000

USER node
CMD ["npm", "start"]
