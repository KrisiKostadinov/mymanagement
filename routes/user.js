const router = require('express').Router();
const { user } = require('../controllers');
const auth = require('../config/auth');

router.get('/index', auth.isWorker, auth.isMessages, user.get.index);
router.get('/login', auth.isNotAuth, user.get.login);
router.get('/register', auth.isNotAuth, user.get.register);
router.get('/logout', user.get.logout);

router.post('/register', auth.isNotAuth, user.post.register);
router.post('/login', auth.isNotAuth, user.post.login);

module.exports = router;