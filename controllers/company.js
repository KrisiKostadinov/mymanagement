const Company = require('../models/Company');

module.exports = {
    get: {
        add(req, res) {
            const user = req.user;

            res.render('company/add', { user, error: '' });
        },

        async all(req, res) {
            const user = req.user;
            
            const companies = await Company.find();

            res.render('company/all', { user, error: '', companies });
        },

        async byUserId(req, res) {
            const user = req.user;

            const companies = await Company.find({ ownerId: user.id });

            res.render('company/my', { user, error: '', companies });
        },

        async byId(req, res) {
            const user = req.user;
            const { id } = req.params;

            const company = await Company.findOne({ _id: id });

            res.render('company/details', { user, error: '', company });
        }
    },

    post: {
        async add(req, res) {
            const user = req.user;
            const { name, imageUrl, phoneNumber } = req.body;

            try {
                await Company.create({
                    name,
                    imageUrl,
                    phoneNumber,
                    ownerId: req.user.id
                });

                res.render('company/add', { user, error: '' });
            } catch(err) {
                res.render('company/add', { user, error: 'Please fill all fields!' });
            }
        }
    }
}