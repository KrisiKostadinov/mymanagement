const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');

const auth = require('./config/auth');

require('dotenv').config();
require('./config/db');

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.env;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use('/user', auth.isNotAuth, require('./routes/user'));
app.use('/', auth.isAuth, require('./routes/initial'));
app.use('/company', require('./routes/company'));

app.listen(port, () => console.log(`Server listening in ${env} on port: ` + port));