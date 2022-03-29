require('dotenv').config();

const { databaseConnection } = require('./configs/mongodb.config');

const Server = require('./configs/server.config');

databaseConnection();

const server = new Server();

server.listen();