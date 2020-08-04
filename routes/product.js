const router = require('express').Router();
const { product } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.setAuthToken, auth.isAuth, product.get.add);
router.get('/all/:companyId', auth.setAuthToken, product.get.all);
router.get('/all', auth.setAuthToken, product.get.all);

router.post('/add', auth.setAuthToken, auth.isAuth, product.post.add);

module.exports = router;