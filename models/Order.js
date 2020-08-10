const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const OrderSchema = new Schema({
    products: [
        {
            companyId: {
                type: ObjectId,
                ref: 'Company'
            },
            count: Number,
        }
    ],

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
    }
});

const Order = model('Order', OrderSchema);

module.exports = Order;