const Resignation = require("../models/Resignation");
const User = require("../models/User");
const Worker = require("../models/Worker");
const Order = require("../models/Order");

module.exports = {
    get: {
        async all(req, res) {
            const user = req.user;
            const { companyId } = req.params;

            const resignations = await Resignation.find({ companyId: companyId }).populate('userId');

            console.log(resignations);
            res.render('resignation/all', { user, resignations });
        }
    },

    post: {
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
        }
    },

    delete: {
        async resignationCancel(req, res) {
            const userId = req.user.id;

            await Resignation.findOneAndDelete({ userId: userId });

            req.flash('success', 'The resignation is cancelled successfully!');
            res.redirect('/user/index');
        },

        async cancel(req, res) {
            const { userId, companyId } = req.body;

            console.log(userId, companyId);

            await Resignation.findOneAndDelete({ userId: userId });

            req.flash('success', 'The resignation is cancelled successfully!');
            res.redirect('/resignation/' + companyId);
        },

        async confirm(req, res) {
            const { userId, companyId } = req.body;

            await Resignation.findOneAndDelete({ userId: userId });

            await User.findOneAndUpdate({ _id: userId }, {
                $set: { claim: null }
            });

            await Worker.findOneAndDelete({ userId: userId });

            await Order.deleteMany({ companyId: companyId });

            req.flash('success', 'The resignation is confirmed successfully!');
            res.redirect('/resignation/' + companyId);
        }
    }
}