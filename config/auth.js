const isAuth = (req, res, next) => {
    if(!req.session.token) {
        return res.redirect('user/login');
    }

    next();
}

module.exports = {
    isAuth,
}