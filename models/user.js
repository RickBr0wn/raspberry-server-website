var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    confirmPassword: {
        type: String,
        unique: true,
        required: true
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;