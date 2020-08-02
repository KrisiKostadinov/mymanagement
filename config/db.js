const mongoose = require('mongoose');

const uri = process.env.URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}, () => {
    console.log('Connected to db');
});