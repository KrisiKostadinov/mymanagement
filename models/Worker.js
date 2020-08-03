const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const WorkerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number
    },

    companyId: {
        type: ObjectId,
        ref: 'Company'
    }
});

const Worker = model('User', WorkerSchema);

module.exports = Worker;