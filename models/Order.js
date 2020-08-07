const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema({
    shopId: {
        type: ObjectId,
        ref: 'Shop'
    },

    workerId: {
        type: ObjectId,
        ref: 'Worker'
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

const Order = model('Order', OrderSchema);

module.exports = Order;