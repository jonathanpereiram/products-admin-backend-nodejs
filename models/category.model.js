const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Categorie', categorySchema);