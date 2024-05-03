FROM node:20-alpine AS build

WORKDIR /frontend

COPY package.json .

RUN apk add --no-cache git

RUN npm install

COPY . .

RUN npm run build

# nginx 
FROM nginx:alpine3.18

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /frontend/build .

# Add CORS settings to nginx default configuration
RUN sed -i '/location \/ {/a \\tadd_header \'Access-Control-Allow-Origin\' \'*\';' /etc/nginx/conf.d/default.conf \
  && sed -i '/location \/ {/a \\tadd_header \'Access-Control-Allow-Methods\' \'GET, POST, OPTIONS\';' /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
