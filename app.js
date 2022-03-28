require('dotenv').config();

const Server = require('./config/server.config');

const server = new Server();

server.listen();