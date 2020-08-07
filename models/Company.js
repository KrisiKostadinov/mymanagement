const { Schema, model } = require('mongoose');
const { String, ObjectId } = Schema.Types;

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String
    },

    phoneNumber: {
        type: String
    },

    ownerId: {
        type: ObjectId,
        ref: 'User'
    },

    candidates: []
});

const Company = model('Company', CompanySchema);

module.exports = Company;