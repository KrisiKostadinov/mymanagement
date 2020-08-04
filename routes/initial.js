const router = require('express').Router();
const initial = require('../controllers/initial');

const auth = require('../config/auth');

router.get('/', auth.setAuthToken, initial.get.home);
router.get('/home', auth.setAuthToken, initial.get.home);

module.exports = router;