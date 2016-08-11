/**
 * Created by chan on 2016. 8. 10..
 */
var express = require('express');
var passport = require('passport');

var app = express();

/* router modules */
var guest = require('./src/server/guest');
var auth_facebook = require('./src/server/auth/facebook');
app.use('/guest', guest);
app.use('/auth/facebook', auth_facebook);

app.listen(3000, function(){
    console.log('svbootcamp_codelab1 listening on port 3000');
});

