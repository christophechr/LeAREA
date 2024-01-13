# AREA Backend

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
DB_PASSWORD=<your-password>
DB_HOST=localhost
DB_PORT=27017

JWT_SECRET=secret

GITHUB_APP_ID=
GITHUB_SECRET=

OPEN_WEATHER_API_KEY=
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
