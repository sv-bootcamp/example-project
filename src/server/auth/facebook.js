/**
 * Created by chan on 2016. 8. 10..
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
let http = require('http');

let _count = {}

//router.get('/', passport.authenticate('facebook'));
router.get('/', function(req, res){
    "use strict";
    console.log("facebook");

    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);


    var host = 'graph.facebook.com';
    var path = '/me?access_token=' + query["token"];
    var https = require('https');
    var options = {
        host: host,
        path: path,
        method: 'GET'
    };

    var result = '';
    var req = https.request(options, function(response) {
        var data = "";
        console.log(response.statusCode);

        response.on('data', function(d) {
            //process.stdout.write(d);
            data += d;
        });
        response.on('end', function(){
            //console.log(data);
            var parsed = JSON.parse(data);
            var name = parsed.name;
            if(_count[name] == undefined) {
                _count[name] = 1;
            }else{
                _count[name]++;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Hello, ' + name + '.</br>');
            res.end('You have visited ' + _count[name] + ' times today.');
            //var http = require('http');
            //var opt = { host: 'localhost:3000', path: 'visit'}

        });
    });
    req.on('error', function(e) {
        console.error(e);
    });

    req.end();
    //res.redirect('http://localhost:3000/visit');
});

function httpreq(){
    "use strict";
    return http.get({
        host: 'graph.facebook.com',
        path: '/me?access_token'
    })
}


module.exports = router;