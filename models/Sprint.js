//Andy Sandefer
var mongoose = require('mongoose');

var SprintCommentSchema = new mongoose.Schema({
    user_name: String,
    comment_text: String,
    last_modified_date: { type: Date, default: Date.now }
});

var SprintSchema = new mongoose.Schema({
    team_id: mongoose.Schema.Types.ObjectId,
    project_id: mongoose.Schema.Types.ObjectId,
    planned_points: Number,
    actual_points: Number,
    start_date: Date,
    end_date: Date,
    non_scored_tasks: Number,
    standard_story_points: Number,
    research_spike_points: Number,
    refactor_points: Number,
    last_modified_date: { type: Date, default: Date.now },
    comments: [SprintCommentSchema],
    new_defects: Number,
    new_escapes: Number,
    total_remaining_defects: Number
});

module.exports = mongoose.model('Sprint', SprintSchema);