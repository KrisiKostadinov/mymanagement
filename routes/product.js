const router = require('express').Router();
const { product } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.setAuthToken, auth.isAuth, product.get.add);
router.get('/all/:companyId', auth.setAuthToken, product.get.all);
router.get('/all', auth.setAuthToken, product.get.all);
router.get('/:id', auth.setAuthToken, product.get.byId);
router.get('/edit/:id', auth.setAuthToken, product.get.edit);

router.post('/add', auth.setAuthToken, auth.isAuth, product.post.add);
router.post('/edit/:id', auth.setAuthToken, auth.isAuth, product.post.edit);

module.exports = router;