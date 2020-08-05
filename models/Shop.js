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
    },

    companyId: {
        type: ObjectId,
        ref: 'Company'
    }
});

const Shop = model('Shop', ShopSchema);

module.exports = Shop;