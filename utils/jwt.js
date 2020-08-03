const jwt = require('jsonwebtoken');

const createToken = async (email) => {
    try {
        const token = await jwt.sign({
            email
        }, 'secret', {
            expiresIn: '60s',
        });

        return token;
    } catch(err) {
        console.log(err);
    }
}

const decodeToken = async (token) => {
    try {
        const decodedToken = await jwt.decode(token);
        return decodedToken;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createToken,
    decodeToken
}