module.exports = {
    get: {
        home(req, res) {
            const user = req.user;

            if(user) {
                console.log(user);
                if(user.claim === 'worker') {
                    return res.redirect('/order/worker/all');
                }
    
                if(user.claim === 'boss') {
                    return res.redirect('/company/my');
                }
                
                if(user.claim === 'admin') {
                    return res.redirect('/admin/');
                }
            }

            res.render('home', { user });
        }
    }
}