FROM node:18-alpine

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app
COPY . .

RUN npm ci && npm cache clean --force
RUN NODE_OPTIONS=--max-old-space-size=8192 npm run build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV BASE_URL="https://app.balapi.happyoffline.eu/"

EXPOSE 3000 

ENTRYPOINT ["node", ".output/server/index.mjs"]