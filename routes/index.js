var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

// set up route middleware
var csrfProtection = csrf();
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err,docs){
    // get all products and render them
    var productChunks = [];
    var chunkSize = 3; // display three products in a row
    for(var i = 0; i < docs.length; i+= chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
     res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  })
  
});

// create user's signup route
router.get('/user/signup', function(req, res, next){
  var messages = req.flash('error')
  res.render('user/signup', {csrfToken:req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


// create profile route
router.get('/profile', function(req, res){
  res.render('user/profile')
});

// create signin route
router.get('/user/signin', function(req, res){
  var messages = req.flash('error')
  res.render('user/signin', {csrfToken:req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/user/signin', passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
