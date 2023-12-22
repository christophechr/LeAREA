FROM node:bullseye as build

WORKDIR /app
COPY package.json .

RUN sudo apt-get install gnupg curl
RUN curl -fsSL https://pgp.mongodb.com/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
RUN sudo apt-get update
RUN sudo apt-get install -y mongodb-org

RUN npm install
COPY . .
#RUN npm run build
#RUN npm install -g serve

EXPOSE 3000

#CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["npm", "start"]
