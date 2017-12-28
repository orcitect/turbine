FROM node:alpine
#ENV NODE_ENV=production
WORKDIR /app
COPY *.js ./
COPY package.json ./
RUN npm install
RUN mkdir /log
VOLUME /log
EXPOSE 8081
CMD node server.js