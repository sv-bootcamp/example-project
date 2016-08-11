var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var counter = {}

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/index', function(req, res) {
	
  if (req.body['id'] in counter) { 
  	counter[req.body['id']] += 1; 
  }
  else { counter[req.body['id']] = 1 }
  var a = {'name': req.body['name'], 'id': req.body['id'], 'count': counter[req.body['id']]};
  res.send(a);

  //res.send(JSON.stringify({'name': req.body['name'], 'Token': req.body['token'], 'count': count}, null, 3));
  //res.send('Token : ' + req.body['token'] + ', count : ' + count);
})

module.exports = router;
