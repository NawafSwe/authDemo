const mongoose = require('mongoose');

/* creating the schema*/
const userSchema = mongoose.Schema({
    email: String,
    password:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;