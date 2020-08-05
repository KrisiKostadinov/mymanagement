const router = require('express').Router();
const { admin } = require('../controllers');

const auth = require('../config/auth');

router.get('/', auth.isAuth, auth.isAdmin, admin.get.all);
router.get('/all', auth.isAuth, auth.isAdmin, admin.get.all);

router.post('/add-worker/:id', auth.isAuth, auth.isAdmin, admin.post.addWorker);

router.delete('/remove-worker/:id', auth.isAuth, auth.isAdmin, admin.delete.byId);

module.exports = router;