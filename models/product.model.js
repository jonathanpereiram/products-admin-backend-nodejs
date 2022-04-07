const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    stock: {
        type: Number,
        required: [true, 'stock is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }
});

module.exports = model('Product', productSchema);