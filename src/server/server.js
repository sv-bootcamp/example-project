import express from 'express';
import path from 'path';
import session from 'express-session'; 
import bodyParser from 'body-parser';
import passport from 'passport';
import fbPassport from 'passport-facebook';
import UserController from './controllers/user';
import AuthFacebook from './routes/user';

const FacebookPassport = fbPassport.Strategy;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './../src/client/views'));
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(session({secret:'facebooklogin'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/facebook', AuthFacebook);

app.listen(3000, function(){
	console.log('listening on port 3000');
});

app.get('/',function(req,res){
	res.render('auth-facebook');
});


passport.serializeUser(function(user,done){
	console.log('serialize');
	done(null, user);
});


// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done){

	done(null, user);

});

passport.use(new FacebookPassport({
	clientID:'167822290307876',
	clientSecret : '9025f9ac6d19800dae45c13608ffc1a9',
	callbackURL : '/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done){

	done(null, profile);
}));


function ensureAuthenticated(req, res, next){
	// if already login
	if (req.isAuthenticated()){ return next(); }
	res.redirect('/');
}