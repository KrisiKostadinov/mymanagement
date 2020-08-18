const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const ResignationSchema = new Schema({
    workerId: {
        type: ObjectId,
        ref: 'Worker'
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

const Resignation = model('Resignation', ResignationSchema);

module.exports = Resignation;