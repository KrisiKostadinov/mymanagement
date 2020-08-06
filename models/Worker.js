const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const WorkerSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    age: {
        type: Number
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

const Worker = model('Worker', WorkerSchema);

module.exports = Worker;