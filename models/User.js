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
});

const User = model('User', UserSchema);

module.exports = User;