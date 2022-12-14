FROM node:16.13.0
ENV NODE_ENV=production
WORKDIR /usr/src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g npm@9.2.0
RUN npm install husky -g
RUN npm install concurrently -g
RUN npm install apollo-server -g
RUN npm install graphql-tools -g
RUN npm install --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src
USER node
CMD ["npm", "start"]

