/**
 * Created by chan on 2016. 8. 10..
 */

var express = require('express');
var router = express.Router();
var path = require('path');
var React = require('react');
var ReactDOM = require('react-dom');

router.get('/', function (request, response){
    console.log('guest');
    response.sendFile(path.resolve('src/client/guest.html'));
});

module.exports = router;