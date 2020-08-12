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

    isValidToken(token, req, res, next);
    
    const user = await decodeTokenAndSetUserData(token, req);

    if(user.claim === process.env.ADMIN_CLAIM) {
        return next();
    }

    res.redirect('/');
}

const isBoss = async (req, res, next) => {
    const token = await getToken(req);

    isValidToken(token, req, res, next);
    
    const user = await decodeTokenAndSetUserData(token, req);
    
    if(user.claim === process.env.BOSS_CLAIM) {
        req.user.claim = process.env.BOSS_CLAIM;
        return next();
    }

    res.redirect('/');
}

const isWorker = async (req, res, next) => {
    const token = await getToken(req);

    isValidToken(token, req, res, next);
    
    const user = await decodeTokenAndSetUserData(token, req);

    if(user.claim === process.env.WORKER_CLAIM) {
        return next();
    }

    res.redirect('/');
}

const isWorkerOrBoss = async (req, res, next) => {
    const token = await getToken(req);

    isValidToken(token, req, res, next);
    
    const user = await decodeTokenAndSetUserData(token, req);

    if(user.claim === process.env.WORKER_CLAIM || user.claim === process.env.BOSS_CLAIM) {
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

const isMessages = (req, res, next) => {
    res.locals.messages = req.flash();
    req.flash('success', null);
    next();
}

const decodeTokenAndSetUserData = async (token, req) => {
    const { email, id, claim, workerId, company } = await decodeToken(token);

    const user = { email, id, claim };
    const worker = { workerId, companyId: company._id };
    
    req.user = user;
    req.worker = worker;
    req.company = company;

    console.log(user);

    return user;
}

const isValidToken = (token, req, res, next) => {
    if(!token) {
        return res.redirect('/');
    }

    next();
}

module.exports = {
    isAuth,
    isNotAuth,
    setAuthToken,
    isAdmin,
    isBoss,
    isWorker,
    isWorkerOrBoss,
    isMessages
}