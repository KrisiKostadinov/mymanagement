const Worker = require('../models/Worker');
const Company = require('../models/Company');
const User = require('../models/User');

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
        },

        success(req, res) {
            const { user, company } = req.session;
            res.render('worker/success', { user, company });
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
        },

        async apply(req, res) {
            const { id, companyId } = req.body;

            const user = await User.findOne({ _id: id });

            const company = await Company.findByIdAndUpdate(companyId, {
                $push: { candidates: {
                    email: user.email,
                    firstName: user.firstName,
                    sirName: user.sirName,
                    lastName: user.lastName,
                    city: user.city,
                } }
            });

            req.session.company = company;
            req.session.user = user;

            res.redirect('/worker/success');
        }
    }
}