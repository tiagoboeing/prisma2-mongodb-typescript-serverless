# Prisma 2 (MongoDB) + TS + Serverless framework

A Stack with:

- Prisma 2
- MongoDB
- Typescript
- Serverless framework

## Run offline

Add MongoDB credentials in `DATABASE_URL` on `.env`.

```bash
git clone git@github.com:tiagoboeing/prisma2-mongodb-typescript-serverless.git

cd prisma2-mongodb-typescript-serverless
npm install

npm start
```

Send a GET request to `http://localhost:3000`

## Deploy

```bash
serverless deploy
```
