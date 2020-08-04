const router = require('express').Router();
const { company } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.setAuthToken, auth.isAuth, company.get.add);
router.get('/all', auth.setAuthToken, company.get.all);
router.get('/my', auth.setAuthToken, auth.isAuth, company.get.byUserId);
router.get('/:id', auth.setAuthToken, company.get.byId);
router.get('/edit/:id', auth.setAuthToken, auth.isAuth, company.get.edit);
router.get('/delete/:id', auth.setAuthToken, auth.isAuth, company.get.deleteById);

router.post('/add', auth.setAuthToken, auth.isAuth, company.post.add);
router.post('/edit/:id', auth.setAuthToken, auth.isAuth, company.post.edit);

router.delete('/:id', auth.setAuthToken, auth.isAuth, company.delete.byId);

module.exports = router;