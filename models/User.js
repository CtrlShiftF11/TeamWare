//Andy Sandefer
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    photo_filename: String,
    last_modified_date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('User', UserSchema);