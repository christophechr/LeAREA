FROM node:latest as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest as release
COPY --from=build /app/build /usr/share/nginx/html/
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]