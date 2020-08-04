const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createToken } = require('../utils/jwt');

module.exports = {
    get: {
        login(req, res) {
            const user = req.user;
            res.render('user/login', { user, error: '' });
        },

        register(req, res) {
            const user = req.user;
            res.render('user/register', { user, error: '' });
        },

        logout(req, res) {
            req.session.token = '';
            res.redirect('/user/login');
        }
    },

    post: {
        async login(req, res) {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if(!user) {
                return res.render('user/login', { user: null, error: 'The password or email is wrong.' });
            }

            const isValid = await bcrypt.compare(password, user.passwordHash);

            if(isValid) {
                const token = await createToken(email, user._id);
                req.session.token = token;
                return res.redirect('/');
            }
            
            res.render('user/login', { user: null, error: 'The password or email is wrong.' });
        },

        async register(req, res) {
            const { email, password, confirmPassword } = req.body;

            if(password !== confirmPassword) {
                return res.render('register', { error: 'The passwords not match.' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const user = await User.create({
                email,
                passwordHash: hash
            });
            
            const token = await createToken(email, user._id);

            req.session.token = token;
            
            res.redirect('/');
        }
    }
}