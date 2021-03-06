const { Schema, model } = require('mongoose');
const { String } = Schema.Types;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },

    claim: {
        type: String
    },

    firstName: {
        type: String
    },

    sirName: {
        type: String
    },

    lastName: {
        type: String
    },

    city: {
        type: String
    },

    phoneNumber: {
        type: String
    }
});

const User = model('User', UserSchema);

module.exports = User;