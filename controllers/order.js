const Product = require('../models/Product');
const Order = require('../models/Order');

module.exports = {
    get: {
        async add(req, res) {
            const data = req.body;
            const user = req.user;
            const { companyId } = req.params;

            const products = await Product.find({ companyId: companyId });

            console.log(products, companyId, 0);
            res.render('order/add', { data, user, products });
        },

        success(req, res) {
            const user = req.user;
            res.render('order/success', { user });
        },

        async all(req, res) {
            const user = req.user;
            const { workerId } = req.worker;

            const orders = await Order.find({ workerId: workerId });

            console.log(orders[0].products);

            res.render('order/all', { user, orders });
        }
    },

    post: {
        async add(req, res) {
            const { workerId } = req.worker;
            const { companyId } = req.company;

            const { products, totalSum } = req.body;

            await Order.create({
                companyId,
                workerId,
                products,
                totalSum,
                status: 'pending'
            });

            res.sendStatus(201);
        }
    }
}