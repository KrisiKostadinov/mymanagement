const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
    get: {
        login(req, res) {
            const user = req.user;
            res.render('user/login', { user });
        },

        register(req, res) {
            const user = req.user;
            res.render('user/register', { user });
        }
    },

    post: {
        login(req, res) {
            const user = req.user;
            res.render('user/login', { user });
        },

        async register(req, res) {
            const { email, password, confirmPassword } = req.body;

            if(password !== confirmPassword) {
                return res.render('register', { error: 'The passwords not match.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            // const user = await User.create({
            //     email,
            //     passwordHash: hash
            // });
            
            const token = await jwt.sign({
                email
            }, 'secret', {
                expiresIn: '60s',
            });

            req.session.token = token;
            
            res.redirect('/');
        }
    }
}