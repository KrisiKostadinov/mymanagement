const router = require('express').Router();
const { report } = require('../controllers');

const auth = require('../config/auth');

router.get('/add/:orderId', auth.isWorker, report.get.add);
router.get('/details/:orderId', auth.isWorkerOrBoss, report.get.byId);

router.post('/add/:orderId', auth.isWorker, report.post.add);

module.exports = router;