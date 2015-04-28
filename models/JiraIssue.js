//Andy Sandefer
var mongoose = require('mongoose');

var JiraProjectSchema = new mongoose.Schema({
    self: String,
    id: Number,
    key: String,
    name: String,
    avatarUrls : [
        {
            "16x16": String,
            "24x24": String,
            "32x32": String,
            "48x48": String
        }
    ]
});

var JiraTeamSchema = new mongoose.Schema({
    self: String,
    value: String,
    id: Number
});

var JiraIssueTypeSchema = new mongoose.Schema({
    self: String,
    id: Number,
    description: String,
    iconUrl: String,
    name: String,
    subtask: Boolean
});

var JiraStatusSchema = new mongoose.Schema({
    self: String,
    description: String,
    iconUrl: String,
    name: String,
    id: Number,
    statusCategory : [
        {
            self: String,
            id: Number,
            key: String,
            colorName: String,
            name: String
        }
    ]
});

//Primary Issue Schema with nested objects...
var JiraIssueSchema = new mongoose.Schema({
    expand: String,
    id: Number,
    self: String,
    key: String,
    fields : {
        summary: String,
        project: [JiraProjectSchema],
        customfield_11901: [JiraTeamSchema],  //Team
        customfield_10600: String, //Epic Id
        issuetype: [JiraIssueTypeSchema],
        status: [JiraStatusSchema],
        updated: String,
        created: String,
        description: String,
        story_points: Number
    }
});

module.exports = mongoose.model('JiraIssues', JiraIssueSchema);