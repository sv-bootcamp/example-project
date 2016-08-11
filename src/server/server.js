var express = require('express');
var path = require('path');
var session = require('express-session');
var 
var passport = require('passport');
var FacebookPassport = require('passport-facebook').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './../src/client/views'));
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function(){
	console.log('listening on port 3000');
});

app.get('/',function(req,res){
	res.render('auth-facebook');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/login_success',
		failureRedirect : 'login_fail'
	})
);

app.get('/login_success', function(req, res){
	res.send(req);
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});


// serialize
// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user,done){
	console.log('serialize');
	done(null, user);
});


// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done){
	console.log('deserialize');
	done(null, user);
});


passport.use(new FacebookPassport({
	clientID:'167822290307876',
	clientSecret : '9025f9ac6d19800dae45c13608ffc1a9',
	callbackURL : '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
	console.log(profile);
	done(null, profile);
}));

function ensureAuthenticated(req, res, next){
	// if already login
	if (req.isAuthenticated()){ return next(); }
	res.redirect('/');
}