module.exports = {
    get: {
        login(req, res) {
            const user = req.user;
            res.render('user/login', { user });
        },

        register(req, res) {
            const user = req.user;
            res.render('user/register', { user });
        }
    }
}