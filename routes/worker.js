const router = require('express').Router();
const { worker } = require('../controllers');

const auth = require('../config/auth');

router.get('/success', auth.isAuth, worker.get.success);

router.post('/resignations', auth.isWorker, worker.post.resignation);
router.post('/apply', auth.isAuth, worker.post.apply);

router.delete('/resignations', auth.isWorker, worker.post.resignationCancel);

module.exports = router;