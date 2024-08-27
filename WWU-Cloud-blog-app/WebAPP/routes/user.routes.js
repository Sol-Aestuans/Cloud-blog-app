const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth.middleware');
const userControllers = require('../controllers/users.controllers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));


router.post('/logout', userControllers.userLogout);

router.post('/login', checkAuth.authenticateUserMiddleware, function(req, res) {
	res.redirect('/post/');
});

router.get('/login', function(req, res) {
	res.render('login');
});

router.get('/register', function(req, res) {
	res.render('register', {
		title: 'Register'
	});
});


router.post(
	'/register',
	body('username', 'Username field cannot be empty.').notEmpty(),
	body('username', 'Username must be between 5-15 characters long.').isLength({ min: 5, max: 15 }),
	body('passwordMatch', 'Passwords do not match, please enter matching passwords.').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}
		// Indicates the success of this synchronous custom validator
		return true;
	}),
    userControllers.userRegister
);

module.exports = router