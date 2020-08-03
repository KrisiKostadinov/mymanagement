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

            const isMyCompany = company.ownerId == user.id;
            console.log(isMyCompany);

            res.render('company/details', { user, error: '', company, isMyCompany });
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;

            const company = await Company.findOne({ _id: id });

            res.render('company/edit', { error: '', user, company });
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

                res.redirect('/company/my');
            } catch(err) {
                res.render('company/add', { user, error: 'Please fill all fields!' });
            }
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;
            const { name, phoneNumber, imageUrl } = req.body;
    
            try {
                const company = await Company.findOne({ _id: id, ownerId: user.id });

                if(company.ownerId != user.id) {
                    console.log(company.ownerId, user.id);
                    return res.redirect('/');
                }

                await Company.findByIdAndUpdate(id, {
                    name,
                    phoneNumber,
                    imageUrl
                });
    
                res.redirect('/company/my');
            } catch(err) {
                console.log(err);
            }
        }
    }
}