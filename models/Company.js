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
    }
});

const Company = model('User', CompanySchema);

module.exports = Company;