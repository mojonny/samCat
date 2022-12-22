FROM node:16.13.0
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g npm@9.2.0
RUN npm install husky -g
RUN npm install concurrently -g

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
RUN cd ../../../
USER node
CMD ["npm", "start"]
