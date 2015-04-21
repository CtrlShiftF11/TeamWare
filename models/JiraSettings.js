//Andy Sandefer
var mongoose = require('mongoose');

var RapidBoardMapSchema = new mongoose.Schema({
    rapid_board_id: Number,
    rapid_board_name: String,
    team_id: mongoose.Schema.Types.ObjectId,
    team_name: String,
    last_modified_date: { type: Date, default: Date.now }
});

var JiraSettingsSchema = new mongoose.Schema({
    root_api_url: String,
    greenhopper_path: String,
    last_modified_date: { type: Date, default: Date.now },
    basic_auth_val: String,
    rapid_board_map: [RapidBoardMapSchema]
});

module.exports = mongoose.model('JiraSettings', JiraSettingsSchema);