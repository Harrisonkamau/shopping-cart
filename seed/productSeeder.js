// import product module
var Product = require('../models/product');

// connect this file to mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/shopping');

// create new products as instances of Product model
var products = [
    new Product({
        imagePath: 'http://2.bp.blogspot.com/-eaUFJXypecU/Vdm7q1b7QiI/AAAAAAAADrw/zBEfnTeOn6M/s1600/3.jpg',
        title:'Gotham Video Game',
        description: 'Awesome game made in Germany!!!',
        price: 10
    }),
     new Product({
        imagePath: 'https://minecraft.net/static/pages/img/minecraft-hero.df1112867f04.jpg',
        title:'Minecraft Game',
        description: 'Awesome game !!!',
        price: 20
    }),
    new Product({
        imagePath: 'http://static4.gamespot.com/uploads/scale_super/1549/15494192/2895125-8700646588-28483.jpg',
        title:'Gamesoft Game',
        description: 'You will love this game!!',
        price: 12
    }), 

    new Product({
        imagePath: 'http://www.legitreviews.com/wp-content/uploads/2016/06/Battlefield-1-press-release-every-game-different.jpg',
        title:'Battlefield 1 Game',
        description: 'Battlefield was released early in 2016.',
        price: 18
    })

];

// create a helper to disconnect exit db after all products are saved
var done = 0;

// save each product
for(var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done ++;
        if(done === products.length){
            exit(); // close db connection after all items have been saved
        }
    })
};

// disconnect from the database
function exit(){
    mongoose.disconnect();
}