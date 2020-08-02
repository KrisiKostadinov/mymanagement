const router = require('express').Router();
const { user } = require('../controllers');

router.get('/login', user.get.login);
router.get('/register', user.get.register);

module.exports = router;