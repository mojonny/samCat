# Stage 1
FROM node:14
ENV NODE_ENV=production
WORKDIR /packages/server/
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .

# Stage 2
WORKDIR /packages/client/
COPY ./package.json ./package.json
COPY ./public ./public
COPY ./src ./src
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
