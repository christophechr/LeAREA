# AREA Backend

## Micropayment Admin setup

* Create a LNbits account => https://legend.lnbits.com/
* Create a main wallet
* Copy the Admin Key from the right API panel
* Crawl the extensions and install the **user manager** extension
* Create a new user with a wallet associated, it will be our admin
* Copy its ID

#### With the Admin ID and your Admin Key in the .env, you can now use the API to create new wallets for users.

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
