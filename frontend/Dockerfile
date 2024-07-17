FROM node:20-alpine AS build

WORKDIR /frontend

COPY package.json .

COPY create-env-file.sh ./create-env-file.sh

RUN apk add --no-cache git

RUN npm install

COPY . .

ARG REACT_APP_API_URL

RUN sh create-env-file.sh REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# nginx 
FROM nginx:alpine3.18

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=build /frontend/build .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
