FROM node:20

RUN apt-get -y update && apt-get install -y --no-install-recommends ca-certificates zip openjdk-17-jdk-headless  && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@latest

RUN java -version && node -v && npm -v && yarn -v

COPY . /app

WORKDIR /app

RUN npm install
RUN npm i @react-native-community/cli-platform-android
RUN npx expo install expo-dev-client

EXPOSE 8082

CMD ["npx", "expo", "start", "-p", "8082"]
