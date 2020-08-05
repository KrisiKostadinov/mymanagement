module.exports = {
    get: {
        home(req, res) {
            const user = req.user;
            console.log(user);
            res.render('home', { user });
        }
    }
}