const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, `The 'name' is required`]
    },
    email: {
        type: String,
        required: [true, `The 'email' is required`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `The 'password' is required`]
    },
    img: {
        type: String
    },
    active: {
        type: String,
        default: true
    }
});

module.exports = model('User', userSchema);