FROM node:20

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates zip openjdk-17-jdk-headless  && rm -rf /var/lib/apt/lists/*

RUN java -version && node -v && npm -v && yarn -v

WORKDIR /app

COPY . .

ENV EAS_NO_VCS=1

RUN npm install
RUN npm i @react-native-community/cli-platform-android
RUN npm install -g expo@45.0.0
RUN npm install -g eas-cli
RUN npx expo install expo-dev-client
#RUN yarn add expo

RUN npx expo start

CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
