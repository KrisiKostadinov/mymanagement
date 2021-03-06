const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
var flash = require('connect-flash');

require('dotenv').config();
require('./config/db');

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.env;

app.use(flash());
app.use(express.static("public"));

app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: '1mb' }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/user', require('./routes/user'));
app.use('/', require('./routes/initial'));
app.use('/company', require('./routes/company'));
app.use('/product', require('./routes/product'));
app.use('/shop', require('./routes/shop'));
app.use('/worker', require('./routes/worker'));
app.use('/order', require('./routes/order'));
app.use('/report', require('./routes/report'));
app.use('/resignation', require('./routes/resignation'));
app.use('/admin', require('./routes/admin'));

app.listen(port, () => console.log(`Server listening in ${env} on port: ` + port));