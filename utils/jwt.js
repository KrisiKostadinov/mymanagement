const jwt = require('jsonwebtoken');

const createToken = async (email, id, claim = null) => {
    try {
        const token = await jwt.sign({
            email,
            id,
            claim
        }, process.env.SECRET, {
            expiresIn: process.env.EXPIRES_IN,
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

const verifyToken = async (token) => {
    try {
        const verifiedToken = await jwt.verify(token, process.env.SECRET);
        return verifiedToken;
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    createToken,
    decodeToken,
    verifyToken,
}