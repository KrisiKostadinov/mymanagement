const router = require('express').Router();
const { worker } = require('../controllers');

const auth = require('../config/auth');

router.get('/success', auth.isAuth, worker.get.success);

router.post('/apply', auth.isAuth, worker.post.apply);

module.exports = router;