const Worker = require('../models/Worker');
const Company = require('../models/Company');
const User = require('../models/User');
const Resignation = require('../models/Resignation');

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
            
            await User.findByIdAndUpdate(id, {
                $set: { claim: 'pending' }
            });

            req.session.company = company;
            req.session.user = user;

            res.redirect('/worker/success');
        },

        async resignation(req, res) {
            const { workerId, companyId } = req.body;
            const userId = req.user.id;

            await Resignation.create({
                workerId,
                userId,
                companyId,
            });

            req.flash('success', 'The resignation is sended successfully!');
            res.redirect('/user/index');
        },

        async resignationCancel(req, res) {
            const userId = req.user.id;

            await Resignation.findOneAndDelete({ userId: userId });

            req.flash('success', 'The resignation is cancelled successfully!');
            res.redirect('/user/index');
        }
    }
}