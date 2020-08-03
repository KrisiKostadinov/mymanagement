const { decodeToken } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
    const token = req.session.token;

    if(!token) {
        return res.redirect('user/login');
    }
    
    const decodedToken = await decodeToken(token);
    req.user = decodedToken.email;
    next();
}

module.exports = {
    isAuth,
}