var express = require('express');
var router = express.Router();
var csurf = require('csurf')

var Product = require('../models/product');

// set up route middleware
var csrfProtection = csrf();

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



module.exports = router;
