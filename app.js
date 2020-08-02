const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.env;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', require('./routes/user'));
app.use('/', require('./routes/initial'));


app.listen(port, () => console.log(`Server listening in ${env} on port: ` + port));