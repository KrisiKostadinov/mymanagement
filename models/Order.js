const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema({
    products: [{
        name: String,
        price: String,
        count: String,
        salesCount: String,
        product: {
            type: ObjectId,
            ref: 'Product'
        }
    }],

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

    reportId: {
        type: ObjectId,
        ref: 'Report'
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