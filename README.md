# Ekodex-RESTAPI

A repository to represent the server backend for Ekodex, a single platform for game projects that I've created and are applicable to a single gaming platform model.

Check out the front-end website repository: https://github.com/vericks101/Ekodex-Web

## Local Setup and Configuration
Ensure `node_modules` is available else the application will fail to run. If needed, run `npm install` to pull the needed dependencies.

You will also need to provide a `.env` file with the following configuration parameters provided:
```
DB_CONNECT
TOKEN_SECRET
EMAIL_ADDRESS
EMAIL_CLIENT_ID
EMAIL_CLIENT_SECRET
EMAIL_REFRESH_TOKEN
EMAIL_ACCESS_TOKEN
```

Once the above is followed, run `npm start` to locally start up the server application.
