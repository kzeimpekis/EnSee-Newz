# Konstantinos Zeimpekis News API

## API URL

https://kostas-nc-news.herokuapp.com/

## Summary

The goal of the project is to create an Application Programming Interface (API) that interacts with the client and the database that contains data regarding News, and responds to their requests.

The next step of the project is to create a Front-End interface of this application. 

The data was provided by [Northcoders](https://www.northcoders.com) during the Back-End phase of my training.

## Instructions

### 1. Cloning the repository

```git clone https://git.heroku.com/kostas-nc-news.git```

### 2. Installing the Dependencies

First and foremost, you have to install [Node.js](https://nodejs.org/en/download/) 

Read the `package.json` file to check the versions of the dependencies
(optional: you can run ```npm install``` that automatically installs the mandatory dependecies)

Standard dependencies:

1. [dotenv](https://www.npmjs.com/package/dotenv)

2. [express](https://www.npmjs.com/package/express)

3. [pg](https://www.npmjs.com/package/pg)

4. [pg-format](https://www.npmjs.com/package/pg-format)

```npm install dotenv express pg pg-format```

Optional dependencies:

1. [jest](https://www.npmjs.com/package/jest)

2. [jest-sorted](https://www.npmjs.com/package/jest-sorted?activeTab=readme)

3. [supertest](https://www.npmjs.com/package/supertest)

```npm install jest jest-sorted supertest -D```

### 3. Seeding the Local Database

### 4. Creating the .env Files

You will need to create _two_ `.env` files for your project: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these `.env` files are .gitignored.

### 5. Unit Testing

- app testing

```npm test app```

- utils testing

```npm test utils```

### NOTE: Minimum Versions

- Node.js  16.11.1

- Postgres  12.9