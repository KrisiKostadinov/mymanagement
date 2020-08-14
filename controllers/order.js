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

            const now = new Date();

            var orders = await Order.find({ workerId: workerId, month: now.getMonth() }).sort({ createdAt: -1 });

            res.render('order/all', { user, orders, companyId, isMyCompany: null, workerId, now });
        },

        async allInCompany(req, res) {
            const user = req.user;
            const { workerId } = req.params;
            const { companyId, ownerId } = req.company;

            const now = new Date();

            const orders = await Order.find({ workerId: workerId, month: now.getMonth() }).sort({ createdAt: -1 });
            const isMyCompany = user.id == ownerId;

            res.render('order/all', { user, orders, companyId, isMyCompany, workerId, now });
        },

        async calculateSumOfOrders(req, res) {
            const { workerId } = req.params;

            var now = new Date();

            const orders = await Order.find(
                {
                    workerId: workerId,
                    month: now.getMonth()
                }, 'totalSum').populate('reportId');

            const orderProducts = await Order.find({ workerId: workerId }, 'products');

            var totalSum = 0;
            var expectedSum = 0;
            var diffSum = 0;
            var salesCount = 0;
            var expectedSalesCount = 0;
            var ordersCount = 0;

            orderProducts.forEach(order => {
                order.products.forEach(product => {
                    expectedSalesCount += Number(product.count);
                });
            });

            orders.forEach(order => {
                if(order.reportId) {
                    totalSum += Number(order.reportId.totalSum);
                    expectedSum += Number(order.reportId.expectedSum);
                    salesCount += Number(order.reportId.salesCount);
                }

                ordersCount++;
            });

            if(expectedSum == 0 && totalSum == 0) {
                return res.status(400).send({ error: 'Don\'t reports for now!' });
            }

            diffSum = Math.abs(totalSum - expectedSum);

            res.send({
                totalSum,
                expectedSum,
                diffSum,
                salesCount,
                expectedSalesCount,
                ordersCount,
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