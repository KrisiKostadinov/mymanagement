const bcrypt = require('bcrypt');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const { createToken } = require('../utils/jwt');

module.exports = {
    get: {
        login(req, res) {
            res.render('user/login', { user: false, data: false, error: '' });
        },

        register(req, res) {
            res.render('user/register', { user: false, data: false, error: '' });
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
                const token = await createToken(email, user._id, user.claim);
                req.session.token = token;
                return res.redirect('/');
            }
            
            res.render('user/login', { user: false, data: user, error: 'The password or email is wrong.' });
        },

        async register(req, res) {
            const user = req.body;

            if(user.password !== user.confirmPassword || user.password == '') {
                return res.render('user/register', { error: 'The passwords not match.', user: false, data: user });
            }

            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(user.password, salt);

                const persistedUser = await User.create({
                    email: user.email,
                    passwordHash: hash
                });

                const persistedUserInfo = await UserInfo.create({
                    firstName: user.firstName,
                    sirName: user.sirName,
                    lastName: user.lastName,
                    city: user.city,
                });

                console.log(persistedUserInfo);
                
                const token = await createToken(user.email, persistedUser._id);

                req.session.token = token;
                
                res.redirect('/');
            } catch(err) {
                if(err.code == '11000') {
                    res.render('user/register', { error: 'This email already exists!', user: false, data: user });
                } else {
                    res.render('user/register', { error: 'Email and password fields is required!', user: false, data: user });
                }
            }
        }
    }
}