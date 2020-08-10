const router = require('express').Router();
const { order } = require('../controllers');

const auth = require('../config/auth');

router.get('/:companyId', auth.isWorker, order.get.add);
router.get('/status/success', auth.isWorker, order.get.success);

router.post('/add', auth.isWorker, order.post.add);

module.exports = router;