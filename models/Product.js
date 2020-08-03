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

    bestTo: {
        type: Date,
        required: true,
    },

    companyId: {
        type: ObjectId,
        ref: 'Company'
    }
});

const Product = model('Product', ProductSchema);

module.exports = Product;