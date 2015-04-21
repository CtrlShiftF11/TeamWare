//Andy Sandefer
var mongoose = require('mongoose');

var JiraProjectSchema = new mongoose.Schema({
    jira_id: Number,
    name: String,
    key: String
});

module.exports = mongoose.model('JiraProjects', JiraProjectSchema);