const router = require('express').Router();
const { worker } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.isAuth, auth.setAuthToken, worker.get.add);
router.get('/success', auth.isAuth, auth.setAuthToken, worker.get.success);

router.post('/add', auth.isAuth, auth.setAuthToken, worker.post.add);
router.post('/apply', auth.isAuth, auth.setAuthToken, worker.post.apply);

module.exports = router;