FROM node:latest AS build-node
WORKDIR /app
COPY package*.json ./
COPY . .

RUN npm install
RUN yarn add expo
RUN npx expo prebuild --platform android

FROM openjdk:8-jdk-alpine AS build-java

COPY --from=build-node /app /app
WORKDIR /app

RUN apk add --update nodejs npm

RUN cd ./android/ && ./gradlew assembleRelease && cd ..
RUN ls -la android/app/build/outputs/bundle/release/
CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
