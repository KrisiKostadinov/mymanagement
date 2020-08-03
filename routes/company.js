const router = require('express').Router();
const { company } = require('../controllers');

router.get('/add', company.get.add);
router.get('/all', company.get.all);
router.get('/my', company.get.byUserId);
router.get('/:id', company.get.byId);
router.get('/edit/:id', company.get.edit);

router.post('/add', company.post.add);
router.post('/edit/:id', company.post.edit);

module.exports = router;