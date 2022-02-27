FROM node:16-alpine as base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as build-node
RUN npm install @sveltejs/adapter-node@next
RUN sed -i "s#@sveltejs/adapter-auto#@sveltejs/adapter-node#" svelte.config.js
RUN npm run build

FROM base as build-static
RUN npm install @sveltejs/adapter-static@next
RUN sed -i "s#@sveltejs/adapter-auto#@sveltejs/adapter-static#" svelte.config.js
RUN npm run build

FROM node:16-alpine AS node
WORKDIR /home/node/app
COPY --from=build-node /home/node/app/build /home/node/app
COPY package*.json ./
ENV NODE_ENV="production"
RUN npm install --production
USER node
EXPOSE 3000
CMD ["node", "."]

FROM nginx:stable-alpine AS static-web
COPY --from=build-static /home/node/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
