var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


// define user schema
var userSchema = new Schema({
    email:{type: String, required: true},
    password:{type: String, required: true}
});

// create helper methods for encrypting password
userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


// export user model
module.exports = mongoose.model('User', userSchema);