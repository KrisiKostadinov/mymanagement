const User = require('../models/User');

module.exports = {
    get: {
        async all(req, res) {
            const user = req.user;

            const users = await User.find();
            res.render('admin/all', { user, users });
        }
    },

    post: {
        async addWorker(req, res) {
            const { id } = req.params;
            
            await User.findByIdAndUpdate(id, {
                claim: 'worker'
            });
            
            res.redirect('/admin/all');
        }
    },

    delete: {
        async byId(req, res) {
            const { id } = req.params;
            
            await User.findByIdAndUpdate(id, {
                claim: ''
            });
            
            res.redirect('/admin/all');
        }
    }
}