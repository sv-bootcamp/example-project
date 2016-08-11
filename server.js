var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

var routes = require('./src/server/routes/index');

var app = express();
app.use(express.static(path.join(__dirname, 'src/client')));
app.use('/', routes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


/*
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/test/', function (req, res) {
  res.send("This is the test");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/