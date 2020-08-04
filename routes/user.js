const router = require('express').Router();

const { user } = require('../controllers');
const auth = require('../config/auth');

router.get('/login', auth.isNotAuth, user.get.login);
router.get('/register', auth.isNotAuth, user.get.register);
router.get('/logout', auth.isAuth, user.get.logout);

router.post('/register', auth.isNotAuth, user.post.register);
router.post('/login', auth.isNotAuth, user.post.login);

module.exports = router;