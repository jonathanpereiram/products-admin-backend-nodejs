const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/auth';
        this.usersPath = '/api/users';
        this.productsPath = '/api/products';
        this.categoriesPath = '/api/categories';

        this.middlewares();
        this.routers();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routers() {
        this.app.use(this.authPath, require('../routers/auth.router'));
        this.app.use(this.usersPath, require('../routers/user.router'));
        this.app.use(this.productsPath, require('../routers/product.router'));
        this.app.use(this.categoriesPath, require('../routers/category.router'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

}

module.exports = Server;