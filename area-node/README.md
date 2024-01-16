# AREA Backend

## Micropayment Admin setup

* Create a LNbits account => https://legend.lnbits.com/
* Create a main wallet
* Copy the Admin Key from the right API panel
* Crawl the extensions and install the **user manager** extension
* Create a new user with a wallet associated, it will be our admin
* Copy its ID

#### With the Admin ID and your Admin Key in the .env, you can now use the API to create new wallets for users.

## Table of contents

- [AREA Backend](#area-backend)
  - [Table of contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Documentation](#documentation)
  - [Prerequisites](#prerequisites)
    - [Install Node.js](#install-nodejs)
    - [Install dependencies](#install-dependencies)
  - [Database setup](#database-setup)
    - [Create database](#create-database)
      - [Docker](#docker)
      - [Local](#local)
    - [Create database user](#create-database-user)
  - [Store environment variables](#store-environment-variables)
  - [Google configuration](#google-configuration)
    - [Install Google Cloud SDK](#install-google-cloud-sdk)
    - [Init Google Cloud SDK](#init-google-cloud-sdk)
    - [login to Google Cloud](#login-to-google-cloud)

## Introduction

This is the backend of the AREA project.

## Documentation

You can find the API documentation [here](https://app.swaggerhub.com/apis-docs/RAPHAELMERCIE4/AREA/1.0.11).

## Prerequisites

### Install Node.js

```bash
sudo apt install nodejs
```

### Install dependencies

```bash
npm install
```

## Database setup

### Create database

Backend uses MongoDB as database. You can install it locally or use docker image.

#### Docker

```bash
docker run -d -p 27017:27017 --name area-mongo mongo
```

#### Local

```bash
sudo apt install mongodb
```

### Create database user

Start mongo shell

```bash
mongosh
```

Create user

```bash
use area
db.createUser(
    {
        user: "area-backend",
        pwd: <your-password>,
        roles: [
            {
                role: "readWrite",
                db: "area"
            }
        ]
    }
)
```

## Store environment variables

In the .env file, you need to store the following variables:

```dotenv
DB_NAME=area
DB_USER=area-backend
DB_PASSWORD=myPassword
DB_HOST=localhost
DB_PORT=27017
FRONT_URL=http://localhost:8081

JWT_SECRET=secret

HOST=localhost
PORT=8080
FRONT_PORT=3000

GITHUB_APP_ID=
GITHUB_SECRET=

OPEN_WEATHER_API_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_PROJECT_ID=
GOOGLE_AUTH_URI=
GOOGLE_TOKEN_URI=
GOOGLE_AUTH_PROVIDER_X509_CERT_URL=
GOOGLE_CLIENT_SECRET=
GOOGLE_APPLICATION_CREDENTIALS=
GOOGLE_SUB_NAME=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

## Google configuration

### Install Google Cloud SDK

```bash
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-459.0.0-linux-x86_64.tar.gz

tar zxvf google-cloud-sdk-<version>-linux-x86_64.tar.gz google-cloud-sdk

./google-cloud-sdk/install.sh
```

### Init Google Cloud SDK

```bash
./google-cloud-sdk/bin/gcloud init
```

You may have to select the area project.

### login to Google Cloud

```bash
./gcloud auth application-default login
```

From that, it will give you a path to the credentials file.
You have to paste it in the .env file.

```dotenv
GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
```
