FROM node:20

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates zip openjdk-17-jdk-headless  && rm -rf /var/lib/apt/lists/*

RUN java -version && node -v && npm -v && yarn -v

WORKDIR /app

COPY . .

ENV EXPO_TOKEN=Dl413cgQorzsvw2IV4useFuEynt98EtPE_ZXcK4f

RUN npm install
RUN npm i @react-native-community/cli-platform-android
RUN npm install -g expo-dev-client
RUN npm install -g expo-cli
RUN npm install -g eas-cli
#RUN yarn add expo

RUN export ANDROID_HOME=/root/.android/sdk
RUN eas build --non-interactive --platform android --profile development --local

CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
