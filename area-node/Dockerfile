FROM node:latest as build

WORKDIR /app
COPY package.json .

RUN npm install
COPY . .
#RUN npm run build
#RUN npm install -g serve

RUN node -v && npm -v

EXPOSE 8080

#CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["npm", "start"]
