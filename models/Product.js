const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String
    },

    bestDays: {
        type: Number,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    companyId: {
        type: ObjectId,
        ref: 'Company'
    },

    userId: {
        type: ObjectId,
        ref: 'User'
    }
});

const Product = model('Product', ProductSchema);

module.exports = Product;