const router = require('express').Router();
const { resignation } = require('../controllers');

const auth = require('../config/auth');

router.get('/:companyId', auth.isBoss, auth.isMessages, resignation.get.all);

router.post('/', auth.isWorker, resignation.post.resignation);

router.delete('/cancel', auth.isBoss, resignation.delete.cancel);
router.delete('/confirm', auth.isBoss, resignation.delete.confirm);
router.delete('/', auth.isWorker, resignation.delete.resignationCancel);

module.exports = router;