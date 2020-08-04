const Worker = require('../models/Worker');
const Company = require('../models/Company');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            try {
                const companies = await Company.find({ ownerId: user.id });
                return res.render('worker/add', { user, companies });
            } catch(err) {
                console.log(err);
            }
        }
    },

    post: {
        async add(req, res) {
            const user = req.user;
            const data = {
                ...req.body,
                userId: user.id
            };

            try {
                await Worker.create(data);
                res.redirect('/');
            } catch(err) {
                console.log(err);
            }
        }
    }
}