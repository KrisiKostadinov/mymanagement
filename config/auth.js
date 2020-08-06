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
    
    await decodeTokenAndSetUserData(token, req);
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

const setAuthToken = async (req, res, next) => {
    const token = req.session.token;

    if(!token) {
        return next();
    }
    
    const isVerified = await verifyToken(token);

    if(!isVerified) {
        return next();
    }

    await decodeTokenAndSetUserData(token, req);

    next();
}

const isAdmin = async (req, res, next) => {
    const token = await getToken(req);

    if(!token) {
        return res.redirect('/');
    }
    
    const user = await decodeTokenAndSetUserData(token, req);

    if(user.claim === 'admin') {
        req.user.claim = 'admin';
        return next();
    }

    res.redirect('/');
}

const isBoss = async (req, res, next) => {
    const token = await getToken(req);

    if(!token) {
        return res.redirect('/');
    }
    
    const user = await decodeTokenAndSetUserData(token, req);

    if(user.claim === 'boss') {
        req.user.claim = 'boss';
        return next();
    }

    res.redirect('/');
}

const getToken = async (req) => {
    const token = req.session.token;

    if(!token) {
        return false;
    }
    
    const isVerified = await verifyToken(token);

    if(!isVerified) {
        return false;
    }

    return token;
}

const decodeTokenAndSetUserData = async (token, req) => {
    const { email, id, claim } = await decodeToken(token);
    const user = { email, id, claim };
    req.user = user;
    return user;
}

module.exports = {
    isAuth,
    isNotAuth,
    setAuthToken,
    isAdmin,
    isBoss,
}