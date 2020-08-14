const { Schema, model } = require('mongoose');
const { ObjectId, Boolean } = Schema.Types;

const ReportSchema = new Schema({
    workerId: {
        type: ObjectId,
        ref: 'Worker'
    },
    
    orderId: {
        type: ObjectId,
        ref: 'Order'
    },

    totalSum: {
        type: Number,
    },

    expectedSum: {
        type: Number,
    },

    different: {
        type: Number,
    },

    isPassed: {
        type: Boolean,
    },

    salesCount: {
        type: Number,
    },
    
    expectedSalesCount: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Report = model('Report', ReportSchema);

module.exports = Report;