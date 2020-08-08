const router = require('express').Router();
const { company } = require('../controllers');

const auth = require('../config/auth');

router.get('/add', auth.isAuth, company.get.add);
router.get('/all', auth.isAuth, company.get.all);
router.get('/my', auth.isAuth, company.get.byUserId);
router.get('/:id', auth.isAuth, company.get.byId);
router.get('/edit/:id', auth.isBoss, company.get.edit);
router.get('/delete/:id', auth.isBoss, company.get.deleteById);
router.get('/candidations/:id', auth.isBoss, company.get.candidations);
router.get('/allWorkers/:id', auth.isBoss, company.get.allWorkers);
router.get('/', auth.isWorker, company.get.companyWorks);

router.post('/add', auth.isBoss, company.post.add);
router.post('/edit/:id', auth.isBoss, company.post.edit);
router.post('/addWorker/:id', auth.isBoss, company.post.addWorker);

router.delete('/dismissWorker/:id', auth.isBoss, company.delete.dismissWorker);
router.delete('/removeWorker', auth.isBoss, company.delete.removeWorker);
router.delete('/:id', auth.isBoss, company.delete.byId);

module.exports = router;