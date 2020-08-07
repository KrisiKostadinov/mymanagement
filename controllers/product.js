const Product = require('../models/Product');
const Company = require('../models/Company');
const { findById } = require('../models/Company');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;

            const companies = await Company.find({ ownerId: user.id });
            
            res.render('product/add', { user, error: '', companies, product: { } });
        },

        async all(req, res) {
            const user = req.user;
            const companyId = req.params.companyId || req.query.companyId;
            
            const products = await Product.find({ companyId: companyId });
            const company = await Company.findOne({ _id: companyId });

            const isMyCompany = user.id.toString() === company.ownerId.toString();
            
            console.log(isMyCompany);
            
            res.render('product/all', { user, error: '', products, company, isMyCompany });
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

            let isMyProduct = false;
            if(user) {
                isMyProduct = user.id == product.userId;
            }

            res.render('product/details', { user, product, isMyProduct });
        },

        async deleteById(req, res) {
            const user = req.user;
            const { id } = req.params;

            const product = await Product.findOne({ _id: id });
            
            console.log(product);
            res.render('product/delete', { user, product });
        }
    },

    post: {
        async add(req, res) {
            const user = req.user;
            const data = {
                ...req.body,
                userId: user.id
            };

            if(!data.companyId) {
                return res.render('product/add',
                     { user, error: 'You do not create a product without a company!', companies: [], product: data });
            }

            try {
                await Product.create(data);
                res.redirect('all?companyId=' + data.companyId);
            } catch(err) {
                const companies = await Company.find({ ownerId: user.id });
                res.render('product/add', { user, error: 'Please fill all fields!', companies, product: data });
            }
        },

        async edit(req, res) {
            const user = req.user;
            const { id } = req.params;
            const data = req.body;

            try {
                const product = await Product.findById(id);

                const isMyProduct = product.userId == user.id;
                if(!isMyProduct) {
                    return res.redirect('/');
                }

                await Product.findByIdAndUpdate(id, data);
                res.redirect('/product/all?companyId=' + product.companyId);
            } catch(err) {
                console.log(err);
            }
        }
    },

    delete: {
        async byId(req, res) {
            const { id } = req.params;
            const user = req.user;

            const product = await Product.findOne({ _id: id });

            const isMyProduct = product.userId == user.id;
            if(isMyProduct) {
                await Product.findByIdAndDelete(id);
                return res.redirect('/product/all?companyId=' + product.companyId);
            }

            res.redirect('/');
        }
    }
}