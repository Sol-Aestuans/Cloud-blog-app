const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const ejs = require('ejs');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth.middleware');
const postControllers = require('../controllers/posts.controllers');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));


const aboutContent =
	'A demo blog app for CSCI 497/597U. Users must register to view or compose posts.';

router.get('/compose', checkAuth.isAuthenticatedMiddleware, (req, res) => {
    res.render('compose');
});

router.get('/about', (req, res) => {
    res.render('about', { aboutContent: aboutContent });
});

router.get('/posts/:postId', checkAuth.isAuthenticatedMiddleware, postControllers.displayPost);

router.get('', checkAuth.isAuthenticatedMiddleware, postControllers.displayAllPosts);
router.post('/compose', checkAuth.isAuthenticatedMiddleware, postControllers.composePost);

module.exports = router;
