const Worker = require('../models/Worker');
const Company = require('../models/Company');
const User = require('../models/User');

module.exports = {
    get: {
        success(req, res) {
            const { user, company } = req.session;
            res.render('worker/success', { user, company });
        }
    },

    post: {
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
                    phoneNumber: user.phoneNumber,
                    userId: id,
                } }
            });

            req.session.company = company;
            req.session.user = user;

            res.redirect('/worker/success');
        }
    }
}