const router = require('express').Router();
const { order } = require('../controllers');

const auth = require('../config/auth');

router.get('/:companyId', auth.isWorker, order.get.add);
router.get('/status/success', auth.isWorker, order.get.success);
router.get('/worker/all', auth.isWorker, auth.isMessages, order.get.all);
router.get('/company/all/:workerId', auth.isBoss, auth.isMessages, order.get.allInCompany);
router.get('/worker/all/:month', auth.isWorker, auth.isMessages, order.get.all);
router.get('/company/all/:workerId/:month', auth.isWorkerOrBoss, auth.isMessages, order.get.allInCompany);
router.get('/sumOfOrders/:workerId/:month', auth.isWorkerOrBoss, order.get.calculateSumOfOrders);
router.get('/details/worker/:orderId', auth.isWorkerOrBoss, order.get.byId);

router.post('/add', auth.isWorker, order.post.add);
router.post('/company/:orderId', auth.isBoss, order.post.confirmOrder);

router.delete('/worker/:orderId', auth.isWorker, order.delete.cancel);
router.delete('/company/:orderId', auth.isBoss, order.delete.companyCancel);

module.exports = router;