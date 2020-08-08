const router = require('express').Router();
const { product } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.isBoss, product.get.add);
router.get('/all/:companyId', auth.isAuth, product.get.all);
router.get('/all', auth.isAuth, product.get.all);
router.get('/:id', auth.isAuth, product.get.byId);
router.get('/edit/:id', auth.isBoss, product.get.edit);
router.get('/delete/:id', auth.isBoss, product.get.deleteById);

router.post('/add', auth.isBoss, product.post.add);
router.post('/edit/:id', auth.isBoss, product.post.edit);

router.delete('/:id', auth.isBoss, product.delete.byId);

module.exports = router;