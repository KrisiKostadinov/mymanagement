const router = require('express').Router();
const { worker } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.setAuthToken, worker.get.add);

router.post('/add', auth.setAuthToken, worker.post.add);

module.exports = router;