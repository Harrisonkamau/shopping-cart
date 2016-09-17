var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define user schema
var userSchema = new Schema({
    email:{type: String, required: true},
    password:{type: String, required: true}
});


// export user model
module.exports = mongoose.model('User', userSchema);