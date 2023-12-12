FROM node:latest

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .

RUN npm install
#RUN npm install -g expo-cli
RUN npx expo prebuild --platform android
RUN ./android/gradlew assembleRelease
RUN ls -la android/app/build/outputs/bundle/release/
CMD ["cp", "android/app/build/outputs/bundle/release/*.apk", "/pipe"]
