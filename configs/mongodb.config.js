const mongoose = require('mongoose');

const databaseConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN);
        console.log('Database connected')
    } catch (error) {
        console.log(error);
        throw new Error('Connection to database failed');
    }
}

module.exports = {
    databaseConnection
}