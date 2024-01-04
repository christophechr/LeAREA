FROM node:20

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openjdk-17-jdk-headless && rm -rf /var/lib/apt/lists/*

RUN java -version && node -v && npm -v && yarn -v

WORKDIR /app

COPY . .
RUN npm install
RUN npm i @react-native-community/cli-platform-android
RUN yarn add expo
RUN npx expo prebuild --platform android
RUN cd ./android/ && ./gradlew assembleRelease
RUN ls -la android/app/build/outputs/bundle/release/
CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
