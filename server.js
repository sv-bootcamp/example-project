var express = require('express');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var engine = require('ejs-locals');
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')



// app.use(logger('dev'));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/src/client'));

// app.engine('ejs', engine);
// app.set('view engine', 'ejs');
// app.set('views', __dirname+"/views");

// Additional middleware which will set headers that we need on each request.
// app.use(function(req, res, next) {
//     // Set permissive CORS header - this allows this server to be used only as
//     // an API server in conjunction with something like webpack-dev-server.
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Disable caching so we'll always get the latest comments.
//     res.setHeader('Cache-Control', 'no-cache');
//     next();
// });

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))



app.get('/', function(req, res) {
	res.sendFile(__dirname + '/src/client/index.html')
});

var server = app.listen(4015, function() {
	console.log('listening on port %d', server.address().port);
});