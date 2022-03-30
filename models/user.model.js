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
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    active: {
        type: String,
        default: true
    }
});

userSchema.methods.toJSON = function() {
    const {__v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', userSchema);