const router = require('express').Router();
const initial = require('../controllers/initial');

router.get('/', initial.get.home);
router.get('/home', initial.get.home);

module.exports = router;