var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  connection.query('insert into infoperso values(null, ?, ?, ?, ?, ?, ?, ?);',
  [req.body.nom, req.body.prenom, req.body.anniversaire, req.body.mail, req.body.num, req.body.place, req.body.arrondissement]
  function (error, results, fields) {
					if (error) throw error;
					res.redirect('/base');
});
  res.render('index');
});

router.get('/base', function(req, res, next){
  connection.query('select * from infoperso')
  res.render('base');
});
module.exports = router;
