const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/* creating the schema*/
const userSchema = mongoose.Schema({
    username: String,
    password:String
});

//right away after the schema we add the passport local mongoose package to the user schema 

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;