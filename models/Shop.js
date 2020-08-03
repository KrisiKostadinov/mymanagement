const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const ShopSchema = new Schema({
    address: {
        type: String,
        required: true,
    },

    workerId: {
        type: ObjectId,
        ref: 'Worker'
    }
});

const Shop = model('User', ShopSchema);

module.exports = Shop;