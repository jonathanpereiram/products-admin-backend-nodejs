const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

categorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
}

module.exports = model('Categorie', categorySchema);