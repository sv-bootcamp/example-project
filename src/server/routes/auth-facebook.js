import express from 'express';
import passport from 'passport';
import UserController from './../controllers/user';

const router = express.Router();


router.get('/', passport.authenticate('facebook'));
router.get('/callback',
	passport.authenticate('facebook', {
		successRedirect : 'login_success',
		failureRedirect : 'login_fail'
	})
);

router.get('/login_success', function(req, res){

	var userController = new UserController();
	userController.updateCount(req.user.id);

	const count = userController.getCount(req.user.id);

	var user = {
		displayName : req.user.displayName,
		count : count,
	};

	res.render('login-success',user);

});

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

module.exports = router;