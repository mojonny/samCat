FROM node:16.13.0
ENV NODE_ENV=production
WORKDIR /app/site/

COPY package.json /app
COPY package-lock.json* /app/
COPY npm-shrinkwrap.json* /app/
COPY packages/ /app/packages/

RUN npm install -g npm@9.2.0
RUN npm install husky -g
RUN npm install eslint -g
RUN npm install concurrently -g

COPY . .
EXPOSE 8000
RUN chown -R node /app/site/
RUN cd ../../
USER node
CMD ["npm", "start"]



