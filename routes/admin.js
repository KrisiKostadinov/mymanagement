const router = require('express').Router();
const { admin } = require('../controllers');

const auth = require('../config/auth');

router.get('/', auth.isAdmin, admin.get.all);
router.get('/all', auth.isAdmin, admin.get.all);

router.post('/add-worker/:id', auth.isAdmin, admin.post.addWorker);

router.delete('/remove-worker/:id', auth.isAdmin, admin.delete.byId);

module.exports = router;