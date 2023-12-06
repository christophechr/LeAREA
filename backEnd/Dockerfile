FROM node:latest

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

RUN echo "Warning, running in dev mode !"
CMD ["npm", "run", "dev"]
