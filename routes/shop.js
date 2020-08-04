const router = require('express').Router();
const { shop } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.isAuth, auth.setAuthToken, shop.get.add);

router.post('/add', auth.isAuth, auth.setAuthToken, shop.post.add);

module.exports = router;