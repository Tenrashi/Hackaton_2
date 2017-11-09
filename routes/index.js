var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const config = require('../config.js');
const connection = mysql.createConnection(config);
/* GET home page. */

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/index', function(req, res, next) {
//   connection.query('insert into infoperso values(null, ?, ?, ?, ?, ?, ?, ?);',
//   [req.body.nom, req.body.prenom, req.body.anniversaire, req.body.mail, req.body.num, req.body.place, req.body.arrondissement],
//   function (error, results, fields) {
// 				if (error){
//             console.log(error);
//         }else{
//           res.redirect('/base');
//         };
//     });
// });
//   res.render('index');
// });

router.post('/index', function (req, res, next) {
// Création d'article
connection.query('INSERT INTO infoperso VALUES(NULL, ?, ?, ?, ?, ?, ?, ?);',
[req.body.nom, req.body.prenom, req.body.anniversaire, req.body.mail, req.body.num, req.body.place, req.body.arrondissement],
function (error, results, fields) {
  console.log(req.body);
    if (error) {
        console.log(error);
    } else {
      res.redirect('/base');
    };
  });
});

router.get('/base', function(req, res, next){
    connection.query('SELECT * FROM infoperso;', function(error, results, fields) {
      res.render('base', {infoperso:results});
    });
});


module.exports = router;
