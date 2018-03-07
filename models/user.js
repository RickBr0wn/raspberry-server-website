var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;