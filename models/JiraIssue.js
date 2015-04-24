//Andy Sandefer
var mongoose = require('mongoose');

var JiraProjectSchema = new mongoose.Schema({
    self: String,
    id: Number,
    key: String,
    name: String,
    avatarUrls : [
        {
            img16x16: String,
            img24x24: String,
            img32x32: String,
            img48x48: String
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
        team: [JiraTeamSchema],
        epic_id: String,
        issuetype: [JiraIssueTypeSchema],
        status: [JiraStatusSchema],
        updated: String,
        created: String,
        description: String,
        story_points: Number
    }
});

module.exports = mongoose.model('JiraIssues', JiraIssueSchema);