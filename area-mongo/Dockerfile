FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=area-backend
ENV MONGO_INITDB_ROOT_PASSWORD=mypassword
ENV MONGO_INITDB_DATABASE=area

EXPOSE 27017
EXPOSE 35580

COPY mongo-init.js /docker-entrypoint-initdb.d/

CMD ["mongod"]
