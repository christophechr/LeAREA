FROM node:latest as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve

EXPOSE 8081

CMD ["serve", "-s", "build", "-l", "8081"]
