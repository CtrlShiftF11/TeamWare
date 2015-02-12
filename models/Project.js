//Andy Sandefer
var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    name: String,
    last_modified_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);