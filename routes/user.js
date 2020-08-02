const router = require('express').Router();
const { user } = require('../controllers');

router.get('/login', user.get.login);
router.get('/register', user.get.register);

router.post('/register', user.post.register);
router.post('/login', user.post.login);

module.exports = router;