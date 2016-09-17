var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password){
    User.findOne({'email'},function(err, result){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email already in use!'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = password;

    })
}))