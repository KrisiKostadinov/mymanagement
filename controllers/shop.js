const Company = require('../models/Company');
const Shop = require('../models/Shop');
const Worker = require('../models/Worker');
const url = require('url');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            try {
                const companies = await Company.find({ ownerId: user.id });
                const workers = await Worker.find({ userId: user.id });
                const isValid = workers.length !== 0;
                res.render('shop/add', { user, companies, workers, isValid, shop: { }, error: '' });
            } catch(err) {
                console.log(err);
            }
        },

        async edit(req, res) {
            const user = req.user;
            const data = req.body;
            const id = req.params.id;

            try {
                const shop = await Shop.findById(id);
                res.render('shop/edit', { shop, user });
            } catch(err) {
                console.log(err);
                res.render('shop/add', { user, error: 'Please fill all fields!', shop: data });
            }
        },

        async byId(req, res) {
            const user = req.user;
            const { id, companyId } = req.params || req.query;

            try {
                const shop = await Shop.findById(id);
                const isMyShop = companyId === shop.companyId;
                res.render('shop/details', { shop, user, isMyShop });
            } catch(err) {
                console.log(err);
            }
        },

        async all(req, res) {
            const user = req.user;
            const companyId = req.params.companyId;

            try {
                const shops = await Shop.find({ companyId: companyId }) || [];
                const company = await Company.findOne({ _id: companyId }) || { };
                
                res.render('shop/all', { shops, user, company });
            } catch(err) {
                console.log(err);
            }
        },

        async deleteById(req, res) {
            const user = req.user;
            const { id } = req.params;

            console.log(id);

            try {
                const shop = await Shop.findById(id);
                res.render('shop/delete', { user, shop });
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
                const shop = await Shop.create(data);
                return res.redirect(`/shop/${shop.companyId}`);
            } catch(err) {
                console.log(err);
                const companies = await Company.find({ ownerId: user.id });
                const workers = await Worker.find({ userId: user.id });
                const isValid = workers.length !== 0;
                res.render('shop/add', { user, error: 'Please fill all fields!', shop: data, companies, isValid, workers });
            }
        },

        async edit(req, res) {
            const user = req.user;
            const data = req.body;
            const id = req.params.id;

            
            try {
                const updatedShop = await Shop.findByIdAndUpdate(id, data);
                console.log(updatedShop);
                res.redirect(`/shop/details/${updatedShop._id}`);
            } catch(err) {
                console.log(err);
                const companies = await Company.find({ ownerId: user.id });
                const workers = await Worker.find({ userId: user.id });
                const isValid = workers.length !== 0;
                res.render('shop/add', { user, error: 'Please fill all fields!', shop: data, companies, isValid, workers });
            }
        }
    },

    delete: {
        async byId(req, res) {
            const { id } = req.params;

            try {
                const deletedShop = await Shop.findByIdAndDelete(id);
                res.redirect(`/shop/${deletedShop.companyId}`);
            } catch(err) {
                console.log(err);
            }
        }
    }
}