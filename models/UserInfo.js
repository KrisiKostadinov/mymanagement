const { Schema, model } = require('mongoose');
const { String } = Schema.Types;

const UserInfoSchema = new Schema({
    firstName: {
        String
    },
    
    sirName: {
        String
    },
    
    lastName: {
        String
    },
    
    city: {
        String
    }
});

const UserInfo = model('UserInfo', UserInfoSchema);

module.exports = UserInfo;