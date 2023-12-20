FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y curl && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get install -y nodejs && apt-get clean

RUN npm install -g yarn

RUN apt-get update && apt-get install -y openjdk-17-jdk && apt-get clean

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$PATH:/usr/lib/jvm/java-17-openjdk-amd64/bin:/usr/local/bin


RUN java -version && node -v && npm -v && yarn -v

WORKDIR /app

COPY . .

RUN npm install
RUN npm i @react-native-community/cli-platform-android
RUN yarn add expo
RUN npx expo prebuild --platform android
RUN cd ./android/ && ./gradlew assembleRelease && cd ..
RUN ls -la android/app/build/outputs/bundle/release/
CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
