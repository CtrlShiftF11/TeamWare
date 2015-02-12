//Andy Sandefer
var mongoose = require('mongoose');

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
    last_modified_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sprint', SprintSchema);