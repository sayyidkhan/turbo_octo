# react-express-mongo-ts-boilerplate
**React(Front-End)**<br/>
**NestJS (Back-End)**<br/>
**MongoDB (Database)**<br/>
combined into a solid full stack boilerplate to kickstart your new projects

![NestJs](https://img.shields.io/badge/express-4.17.x-green.svg)
![React 16](https://img.shields.io/badge/reactjs-16.13.x-green.svg)

Full stack boilerplate built with React, Express and MongoDB at its core, with a few handpicked libraries that I prefer to use when starting new projects. Everything is built on TypeScript to ensure type safety and for the needs of the use of object-oriented on the backend.

## Core

**Server**
- NodeJS
- NestJS
- MongoDB with mongoose
- Passport with jwt (*havent install yet)

**Client**
- React
- Material UI (*havent install yet)
- Axios


## Usage

Run the following commands separately for client and server

You need to run backend and frontend concurrently to be able to successfully run the site.

1. navigate into the backend folder and follow the instructions.
2. navigate into the frontend folder and follow the instructions.

## MongoDB

### Installation for mac
Tap the MongoDB Homebrew Tap to download the official Homebrew formula for MongoDB and the Database Tools, by running the following command in your macOS Terminal:
```
brew tap mongodb/brew
```
To install MongoDB, run the following command in your macOS Terminal application:
```
brew install mongodb-community@4.4
```

### Run for mac 
To run MongoDB (i.e. the mongod process) as a macOS service, issue the following:
```
brew services start mongodb-community@4.4
```
To stop a mongod running as a macOS service, use the following command as needed:
```
brew services stop mongodb-community@4.4
```

more info: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/



