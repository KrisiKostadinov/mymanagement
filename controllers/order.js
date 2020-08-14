const Product = require('../models/Product');
const Order = require('../models/Order');
const constants = require('../config/constants');

module.exports = {
    get: {
        async add(req, res) {
            const data = req.body;
            const user = req.user;
            const companyId = req.company.id;

            const products = await Product.find({ companyId: companyId });

            res.render('order/add', { data, user, products });
        },

        success(req, res) {
            const user = req.user;
            res.render('order/success', { user });
        },

        async all(req, res) {
            const user = req.user;
            const workerId = req.worker.id;
            const companyId = req.company.id;

            var orders = await Order.find({ workerId: workerId }).sort({ createdAt: -1 });

            res.render('order/all', { user, orders, companyId, isMyCompany: null, workerId });
        },

        async allInCompany(req, res) {
            const user = req.user;
            const { workerId } = req.params;
            const { companyId, ownerId } = req.company;

            const orders = await Order.find({ workerId: workerId });
            const isMyCompany = user.id == ownerId;

            res.render('order/all', { user, orders, companyId, isMyCompany, workerId });
        },

        async calculateSumOfOrders(req, res) {
            const { workerId } = req.params;

            var now = new Date();

            const orders = await Order.find(
                {
                    workerId: workerId,
                    month: now.getMonth()
                }, 'totalSum');

            var totalSum = 0;
            var expectedSum = 20;
            var diffSum = 0;

            orders.forEach(order => {
                totalSum += order.totalSum;
            });

            diffSum = Math.abs(totalSum - expectedSum);

            res.send({
                totalSum,
                expectedSum,
                diffSum,
            });
        }
    },

    post: {
        async add(req, res) {
            const workerId = req.worker.id;
            const companyId = req.company.id;

            const { products, totalSum } = req.body;
            
            const now = new Date();
            
            var productIds = [];
            
            products.forEach(product => {
                productIds.push({ _id: product.id });
            });
            
            const order = await Order.create({
                companyId,
                workerId,
                totalSum,
                products,
                status: constants.STATUS_PENDING,
                month: now.getMonth()
            });
            
            await Product.updateMany({ $or: productIds }, { $push: { orders: order._id } });

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
        },

        async companyCancel(req, res) {
            const orderId = req.params.orderId;
            const { workerId } = req.body;

            await Order.findByIdAndDelete(orderId);

            req.flash('success', 'The order is deleted successfully!');
            res.redirect('/order/company/all/' + workerId);
        }
    }
}