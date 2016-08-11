import express from 'express';
import passport from 'passport';
import UserController from './../controllers/user';

const router = express.Router();

const userController = new UserController();

router.get('/', passport.authenticate('facebook'));
router.get('/callback',
	passport.authenticate('facebook', {
		successRedirect : 'login_success',
		failureRedirect : 'login_fail'
	})
);

router.get('/login_success', userController.updateUser);

router.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

export default router;