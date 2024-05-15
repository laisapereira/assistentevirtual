FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN apk update

RUN apk add --no-cache python3
RUN apk add --no-cache make
RUN apk add --no-cache g++
RUN apk add --no-cache git

ENV PYTHON=/usr/bin/python3

RUN npm install -g node-gyp@latest

# Install dependencies
RUN npm install

# Install nodemon and ts-node globally
RUN npm install -g nodemon ts-node

# Copy the rest of your application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Command to run your app using nodemon
CMD ["npm", "run", "dev"]

