var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var TempSchema = new mongoose.Schema({
    temp: {
        type: Number,
        required: true,
        trim: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

var Temp = mongoose.model('Temp', TempSchema);
module.exports = Temp;