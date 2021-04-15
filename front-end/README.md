## Frontend instructions

This frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using TypeScript. Please refer to the source for more information.

Start development client:
```
yarn start-client
```

Run client tests:
```
yarn test-client
```

Build client for production:
```
yarn build-client
```


## Backend instructions

This backend uses PostgreSQL, make sure you have it installed in your system.

Change `username`, `password`, and `database` in `server/db/config.js` according to your own PostgreSQL configurations.

start the Postgres server (might change depeding on your configurations):
```
pg_ctl -D /usr/local/var/postgres start
```

Create the database:
```
npx sequelize db:create
```

Migrate database:
```
npx sequelize-cli db:migrate
```

Seed database with sample data if you want:
```
npx sequelize-cli db:seed:all
```

Start development server:
```
yarn start-server
```

Run server tests:
```
yarn test-server
```

Build server for production:
```
yarn build-server
```

Start server in production environment:
```
yarn serve
```

When needed, you can stop the Postgres server using (might change depeding on your configurations):
```
pg_ctl -D /usr/local/var/postgres stop
```
