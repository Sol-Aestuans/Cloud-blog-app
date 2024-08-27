
const passport = require('passport');


const isAuthenticatedMiddleware = (req, res, next) => {
	console.log('middleware entered');
	if (req.isAuthenticated()) {
		console.log('user authenticated');
		return next();
	} else {
		console.log('user redirected');
		res.redirect('/user/login');
	}
};

const authenticateUserMiddleware = (req,res) => {
  console.log("attempting login");
	passport.authenticate('local', { failureRedirect: '/user/login' })(req,res, function() {
    res.redirect('/post');
  });
  console.log("login successful");
}

module.exports = {
	isAuthenticatedMiddleware,
	authenticateUserMiddleware,
};
