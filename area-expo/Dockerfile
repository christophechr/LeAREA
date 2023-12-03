FROM node:latest

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .

#RUN npm install
#RUN npm install -g expo-cli
#RUN expo build:android
#CMD ["cp", "*.apk", "/shared"]

### Placeholder while building don't work:
RUN touch client.apk
RUN echo "Hello :) I know, this is disapointing..." > client.apk
RUN cp *.apk /shared

CMD ["echo", "I am not know how to build :("]
