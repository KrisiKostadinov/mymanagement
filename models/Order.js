const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema({
    products: [],

    totalSum: {
        type: Number
    },

    status: {
        type: String,
    },

    workerId: {
        type: ObjectId,
        ref: 'Worker'
    },

    companyId: {
        type: ObjectId,
        ref: 'Compnay'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    forWhen: {
        type: Date,
    },

    month: {
        type: Number
    }
});

const Order = model('Order', OrderSchema);

module.exports = Order;