const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const OrderSchema = new Schema({
    shopId: {
        type: ObjectId,
        ref: 'Shop'
    },

    products: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },

    forWhen: {
        type: Date,
        required: true,
    }
});

const Order = model('User', OrderSchema);

module.exports = Order;