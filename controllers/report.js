const Report = require('../models/Report');
const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
    get: {
        async add(req, res) {
            const user = req.user;
            const { orderId } = req.params;

            const order = await Order.findOne({ _id: orderId });

            res.render('report/add', { user, order });
        },

        async byId(req, res) {
            const user = req.user;
            const { orderId } = req.params;

            const report = await Report.findOne({ orderId: orderId }).populate('orderId');

            console.log(report);

            if(!report) {
                return res.render('report/details', { user, error: 'Don\'t report for this order!' });
            }

            res.render('report/details', { user, report, error: null });
        }
    },

    post: {
        async add(req, res) {
            const { orderId } = req.params;
            const workerId = req.worker.id;
            const report = req.body.data;
            
            const orderProducts = await Order.findOne({ _id: orderId }, 'products');

            var totalSum = 0;
            var expectedSum = 0;
            var different = 0;
            var isPassed = false;
            var salesCount = 0;
            var expectedSalesCount = 0;

            orderProducts.products.forEach(product => {
                expectedSum += Number(product.price) * Number(product.count);
                expectedSalesCount += Number(product.count);
            });

            report.forEach(product => {
                totalSum += Number(product.price) * Number(product.salesCount);
                salesCount += Number(product.salesCount);
            });

            different = Math.abs(expectedSum - totalSum);

            if(expectedSum == totalSum) {
                isPassed = true;
            }

            const newReport = await Report.create({
                orderId,
                workerId,
                totalSum,
                expectedSum,
                different,
                salesCount,
                expectedSalesCount,
                isPassed
            });
            
            await Order.findByIdAndUpdate(orderId, { $set: { reportId: newReport._id }});

            res.sendStatus(201);
        }
    }
}