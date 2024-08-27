const User = require('../models/user');
const passport = require('passport');
const { body, validationResult } = require('express-validator');



const userLogout = (req, res, next) => {
    console.log('logout processed');
    req.session.destroy();
    req.logout();
    res.redirect('/post/about');
};

const userRegister = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const input_username = req.body.username;
    const input_email = req.body.email;
    const input_password = req.body.password;


    console.log(input_username);

    const userExists = User.exists({ username: input_username }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log('Result :', doc); // false
            return doc;
        }
    });

    const emailExists = User.exists({ email: input_email }, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log('Result :', doc); // false
            return doc;
        }
    });

    console.log(userExists);

    if (userExists != null || emailExists != null) {
        console.log('User or email exists');
        res.redirect('register');
    } else {
        console.log(input_email, input_password, input_username);
        newUser = new User({ email: req.body.email, username: req.body.username });
        User.register(newUser, input_password, function (err, user) {
            if (err) {
                console.log(err);
                res.redirect('/user/register');
            } else {
                passport.authenticate('local')(req, res, function () {
                    res.redirect('/post');
                });
            }
        });
    }
};

module.exports = {
    userRegister,
    userLogout
};
