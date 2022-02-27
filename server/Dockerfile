FROM node:16-alpine
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .
VOLUME /home/node/app/db
EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]
CMD [ "node", "index.js" ]
