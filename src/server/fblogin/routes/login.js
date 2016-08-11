var express = require('express');
var router = express.Router();

var User = {};

var Login = {
	date: 1,
	
	checkDate: function(token) {
		var nowDate = new Date().getDate();
		if (Login.date != nowDate) {
			Login.date = nowDate;
			User[token].count = 0;
		}
		User[token].count++;
	},
	
	countLogin: function(token) {
		if (User[token]) {
			Login.checkDate(token);
		} else {
			User[token] = {};
			User[token].count = 1;
		}
	}
};

/* GET login listing. */
router.get('/', function(req, res, next) {
	var token = req.query.token;
	Login.countLogin(token);
	res.writeHead(200, {"Content-Type": "text/plain"});
	var resData = {count: User[token].count, date: Login.date};
	res.write(JSON.stringify(resData));
	res.end();
});

module.exports = router;
