const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const uri = process.env.URI;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
}, async () => {
    console.log('Connected to db');

    const users = await User.find();

    if(users.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('123456', salt);

        User.create({
            email: 'admin@admin.com',
            passwordHash: hash
        });
    }
});