const express = require('express');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
const env = process.env.env;

app.listen(port, () => console.log(`Server listening in ${env} on port: ` + port));