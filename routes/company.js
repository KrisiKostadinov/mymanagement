const router = require('express').Router();
const { company } = require('../controllers');

router.get('/add', company.get.add);
router.get('/all', company.get.all);

router.post('/add', company.post.add);

module.exports = router;