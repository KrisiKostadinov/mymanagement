const router = require('express').Router();
const { shop } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.isAuth, auth.setAuthToken, shop.get.add);
router.get('/edit/:id', auth.isAuth, auth.setAuthToken, shop.get.edit);
router.get('/delete/:id', auth.isAuth, auth.setAuthToken, shop.get.deleteById);
router.get('/details/:id', auth.isAuth, auth.setAuthToken, shop.get.byId);
router.get('/:id/:companyId', auth.isAuth, auth.setAuthToken, shop.get.byId);
router.get('/:companyId', auth.isAuth, auth.setAuthToken, shop.get.all);

router.post('/add', auth.isAuth, auth.setAuthToken, shop.post.add);
router.post('/edit/:id', auth.isAuth, auth.setAuthToken, shop.post.edit);

router.delete('/:id', auth.isAuth, auth.setAuthToken, shop.delete.byId);

module.exports = router;