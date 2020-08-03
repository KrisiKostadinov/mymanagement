const { decodeToken, verifyToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
    const token = req.session.token;

    if(!token) {
        return res.redirect('/user/login');
    }

    const isVerified = await verifyToken(token);
    
    if(!isVerified) {
        return res.redirect('/user/login');
    }
    
    const { email, id } = await decodeToken(token);
    req.user = { email, id };
    next();
}

const isNotAuth = async (req, res, next) => {
    const token = req.session.token;

    if(!token) {
        return next();
    }

    const isVerified = await verifyToken(token);
    
    if(!isVerified) {
        return next();
    }

    res.redirect('/');
}

module.exports = {
    isAuth,
    isNotAuth,
}