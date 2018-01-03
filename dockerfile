FROM node:alpine
#ENV NODE_ENV=production
WORKDIR /app
COPY *.js ./
COPY package.json ./
COPY settings.json ./
RUN npm install
RUN mkdir /log
VOLUME /log
EXPOSE 8888
CMD node server.js