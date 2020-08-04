const Product = require('../models/Product');
const Company = require('../models/Company');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            const companies = await Company.find({ ownerId: user.id });
            
            res.render('product/add', { user, error: '', companies });
        },

        async all(req, res) {
            const user = req.user;
            const { companyId } = req.params;

            const products = await Product.find({ companyId: companyId });

            res.render('product/all', { user, error: '', products });
        }
    },

    post: {
        async add(req, res) {
            const data = req.body;
            const user = req.user;

            try {
                const product = await Product.create(data);
                
                res.redirect('/product/all');
            } catch(err) {
                res.render('product/add', { user, error: 'Please fill all fields!', companies: [] });
            }

            res.redirect('/');
        }
    }
}