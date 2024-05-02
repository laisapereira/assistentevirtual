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

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
