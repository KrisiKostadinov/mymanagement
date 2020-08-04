const Product = require('../models/Product');
const Company = require('../models/Company');
const { findById } = require('../models/Company');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            const companies = await Company.find({ ownerId: user.id });
            
            res.render('product/add', { user, error: '', companies });
        },

        async all(req, res) {
            const user = req.user;
            const companyId = req.params.companyId || req.query.companyId;
            console.log('000000000' + companyId);

            
            const products = await Product.find({ companyId: companyId });
            
            res.render('product/all', { user, error: '', products });
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;

            const product = await Product.findOne({ _id: id });
            const companies = await Company.find({ _id: product.companyId });

            res.render('product/edit', { user, product, companies });
        },

        async byId(req, res) {
            const user = req.user;
            const { id } = req.params;

            const product = await Product.findOne({ _id: id });

            res.render('product/details', { user, product });
        }
    },

    post: {
        async add(req, res) {
            const data = req.body;
            const user = req.user;

            try {
                await Product.create(data);
                res.redirect('all?companyId=' + data.companyId);
            } catch(err) {
                res.render('product/add', { user, error: 'Please fill all fields!', companies: [] });
            }
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;
            const data = req.body;

            try {
                const product = await Product.findById(id);

                if(product.companyId == user.id) {
                    return res.redirect('/');
                }

                await Product.findByIdAndUpdate(id, data);
                res.redirect('/product/all?companyId=' + product.companyId);
            } catch(err) {
                console.log(err);
            }
        }
    }
}