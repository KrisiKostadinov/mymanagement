module.exports = {
    get: {
        home(req, res) {
            const user = req.user;

            res.render('home', { user });
        }
    }
}