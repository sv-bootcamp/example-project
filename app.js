var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./src/server/index');
var http = require('http');
var https = require('https');
var Promise = require('promise');
var request = require('request');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

// serialize
// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
    console.log('serialize');
    done(null, user);
});


// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: '111863319260923',
        clientSecret: 'e4da71308d233429efe61293f94666ee',
        callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        https.get({
            host: 'graph.facebook.com',
            path: '/me?access_token=' + accessToken //accessToken
        }, function(response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function(  ) {
                // Data reception is done, do whatever with it!
                var parsed = JSON.parse(body);

                if( map.has( parsed.name )) {
                    let previousValue = map.get( parsed.name );
                    let newValue = previousValue + 1;
                    map.set( parsed.name, newValue );
                } else {
                    map.set( parsed.name, 0);
                }
                _globalCurrentName = parsed.name;

                done(null,profile);
            });
        });
    }
));

var app = express();

let _globalCurrentName = '';
let map = new Map( );

/**
 * Rest API for get the user information...
 */
app.get('/getInfo', function (req, res) {
    https.get({
        host: 'graph.facebook.com',
        path: '/me?access_token=' + req.query.accessToken //accessToken
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log('on');

            res.send({
                name: parsed.name,
                count: map.get( parsed.name )
            });
        });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/login_success',
        failureRedirect: '/login_fail' })
);

app.get('/login_success', function(req, res){
    res.send( 'name : ' + _globalCurrentName + ' count : ' + map.get(_globalCurrentName) );
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = app;
