const Product = require('../models/Product');
const Order = require('../models/Order');
const constants = require('../config/constants');

module.exports = {
    get: {
        async add(req, res) {
            const data = req.body;
            const user = req.user;
            const { companyId } = req.params;

            const products = await Product.find({ companyId: companyId });

            res.render('order/add', { data, user, products });
        },

        success(req, res) {
            const user = req.user;
            res.render('order/success', { user });
        },

        async all(req, res) {
            const user = req.user;
            const { workerId } = req.worker;
            const { companyId } = req.company;

            var orders = await Order.find({ workerId: workerId });

            orders.forEach(order => {
                order.isConfirmed = order.status == constants.STATUS_CONFIRM;
            });

            res.render('order/all', { user, orders, companyId, isMyCompany: null });
        },

        async allInCompany(req, res) {
            const user = req.user;
            const { workerId } = req.params;
            const { companyId, ownerId } = req.company;

            const orders = await Order.find({ workerId: workerId });
            const isMyCompany = user.id == ownerId;
            
            res.render('order/all', { user, orders, companyId, isMyCompany });
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
                status: constants.STATUS_PENDING
            });

            res.sendStatus(201);
        },

        async confirmOrder(req, res) {
            const { orderId } = req.params;
            const { workerId } = req.body;
            
            await Order.findByIdAndUpdate(orderId, {
                $set: { status: constants.STATUS_CONFIRM }
            });
            
            req.flash('success', 'The order is confirmed successfully!');
            res.redirect('/order/company/all/' + workerId);
        }
    },

    delete: {
        async cancel(req, res) {
            const orderId = req.params.orderId;

            await Order.findByIdAndDelete({ _id: orderId, status: constants.STATUS_PENDING });

            res.redirect('/order/worker/all');
        }
    }
}