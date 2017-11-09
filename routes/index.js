var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../config.js');
const connection = mysql.createConnection(config);
const nodemailer = require('nodemailer');
/* GET home page. */

router.get('/index', function(req, res, next) {
  res.render('index');
});


router.post('/index', function (req, res, next) {
// Création d'article
connection.query('INSERT INTO infoperso VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);', [req.body.nom, req.body.prenom, req.body.anniversaire, req.body.mail, req.body.num, req.body.place, req.body.arrondissement], function (error, results, fields) {
  
    if (error) {
        throw error;
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



//----------------------LOGIN-------------------------

router.get('/', function (req, res, next) {
  // Hello session !
  // res.send(req.session.connect);
  // Si la personne est connectée on affiche la page
  // Si la personne n'est pas connectée on le redirige sur la page de connexion
  if (req.session.connect) {
    res.redirect('/index');
  }
  else {
    res.render('login',{login:true});
  }

});

router.post('/', function (req, res, next) {
  // Ici on gère les informations de l'utilisateur

  // Tester si l'utilisateur existe en BDD  -> Comparer le nom (login) / le password
  let login = req.body.login;
  let password = req.body.password;

  connection.query(`select * from users where username= ? and password= ?`, [login, password], function (error, results, fields) {
    console.log(error);
    if (results.length==0) {
      res.render('login' ,{message:"Erreur d'identification"});
    } else {
      req.session.connect = true;
      res.redirect("/index");
    }
  });
});

router.get("/logout", function(req, res, next) {
  req.session.connect = false;
  res.redirect("/");

});


module.exports = router;


