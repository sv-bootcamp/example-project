// var webpack = require('webpack')
// var webpackDevMiddleware = require('webpack-dev-middleware')
// var webpackHotMiddleware = require('webpack-hot-middleware')
// var config = require('./webpack.config')

var app = new (require('express'))()
var port = 3000

// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  // res.sendFile(__dirname + '/index.html')
  res.sendFile('./src/client/index.html');
})

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})












//===========




// //Lets require/import the HTTP module
// var http = require('http');
// var dispatcher = require('httpdispatcher');

// //Lets define a port we want to listen to
// const PORT=3000;

// //We need a function which handles requests and send response
// function handleRequest(request, response){
//     response.end('It Works!! Path Hit: ' + request.url);
// }

// //Create a server
// var server = http.createServer(handleRequest);

// //Lets start our server
// server.listen(PORT, function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });



// //For all your static (js/css/images/etc.) set the directory name (relative path).
// dispatcher.setStatic('resources');

// //A sample GET request
// dispatcher.onGet("/page1", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Page One');
// });

// //A sample POST request
// dispatcher.onPost("/post1", function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Got Post Data');
// });

// function handleRequest(request, response){
//     try {
//         //log the request on console
//         console.log(request.url);
//         //Disptach
//         dispatcher.dispatch(request, response);
//     } catch(err) {
//         console.log(err);
//     }
// }