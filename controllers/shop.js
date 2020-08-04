const Company = require('../models/Company');
const Shop = require('../models/Shop');
const Worker = require('../models/Worker');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            try {
                const companies = await Company.find({ ownerId: user.id });
                const workers = await Worker.find({ userId: user.id });
                const isValid = workers.length !== 0;
                res.render('shop/add', { user, companies, workers, isValid, shop: { } });
            } catch(err) {
                console.log(err);
            }
        }
    },

    post: {
        async add(req, res) {
            const user = req.user;
            const data = req.body;

            try {
                await Shop.create(data);
                res.redirect('/');
            } catch(err) {
                console.log(err);
                const companies = await Company.find({ ownerId: user.id });
                const workers = await Worker.find({ userId: user.id });
                const isValid = workers.length !== 0;
                res.render('shop/add', { user, error: 'Please fill all fields!', shop: data, companies, isValid, workers });
            }
        }
    }
}