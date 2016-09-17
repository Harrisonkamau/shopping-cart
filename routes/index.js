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
  res.render('user/signup', {csrfToken:req.csrfToken()});
});

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));


// create profile route
router.get('/profile', function(req, res){
  res.render('/user/profile')
})

module.exports = router;
