const user = require('../controllers/user');
const company = require('../controllers/company');
const product = require('../controllers/product');
const shop = require('../controllers/shop');
const worker = require('../controllers/worker');
const admin = require('../controllers/admin');
const order = require('../controllers/order');
const report = require('../controllers/report');
const resignation = require('../controllers/resignation');

module.exports = {
    user,
    company,
    product,
    shop,
    worker,
    admin,
    order,
    report,
    resignation,
}