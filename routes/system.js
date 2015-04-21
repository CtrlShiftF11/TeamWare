//Andy Sandefer
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var https = require('https');

var Project = require('../models/Project.js');
var Sprint = require('../models/Sprint.js');
var Team = require('../models/Team.js');
var User = require('../models/User.js');
var JiraSettings = require('../models/JiraSettings.js');
var JiraAdapter = require('../services/jiraAdapter.js');

router.get('/', function(req, res, next){
   JiraSettings.findOne({}, function(err, res){
       if (err){
           next(err);
       }
       else{
           res.json(res.body);
       }
   });
});

//Gather JIRA Rapid Boards for System Settings JIRA Integration feature...
router.post('/jira', function (req, res, next) {
    var jiraAdapter = new JiraAdapter({jiraApiUrl: req.body.url});
    jiraAdapter.rapidViewList(function(jiraResponse) {
        // TODO: handle cases where res.statusCode != 200
        res.json(jiraResponse.body);
    });
});

//Bundle up collection data into JSON files and give the power back to the people...
router.post('/exportmongodbtojson', function (req, res, next) {
    var downloadPath = './public/downloads/exports/';
    var resourceLocations = {};

    //Sprints...
    var sprintQry = Sprint.find().sort({"end_date": -1});
    sprintQry.exec(function (err, sprintExport) {
        if (err) {
            return next(err);
        }
        else {
            var sprintFilename = 'sprintexport' + uuid.v4() + '.json';
            fs.writeFile(downloadPath + sprintFilename, JSON.stringify((sprintExport)), function (err) {
                if (err) {
                    return next('Unable to stream Sprint Export file\n' + err);
                }
                else {
                    resourceLocations["sprintResourceLocation"] = sprintFilename;
                }
            });
        }
    });

    //Teams...
    var teamQry = Team.find().sort({"name": 1});
    teamQry.exec(function (err, teamExport) {
        if (err) {
            return next(err);
        }
        else {
            var teamFilename = 'teamexport' + uuid.v4() + '.json';
            fs.writeFile(downloadPath + teamFilename, JSON.stringify((teamExport)), function (err) {
                if (err) {
                    return next('Unable to stream Team Export file\n' + err);
                }
                else {
                    resourceLocations["teamResourceLocation"] = teamFilename;
                }
            });
        }
    });

    //Projects...
    var projectQry = Project.find().sort({"name": 1});
    projectQry.exec(function (err, projectExport) {
        if (err) {
            return next(err);
        }
        else {
            var projectFilename = 'projectexport' + uuid.v4() + '.json';
            fs.writeFile(downloadPath + projectFilename, JSON.stringify((projectExport)), function (err) {
                if (err) {
                    return next('Unable to stream Project Export file\n' + err);
                }
                else {
                    resourceLocations["projectResourceLocation"] = projectFilename;
                }
            });
        }
    });

    //Users...
    var userQry = User.find().sort({"name": 1});
    userQry.exec(function (err, userExport) {
        if (err) {
            return next(err);
        }
        else {
            var userFilename = 'userexport' + uuid.v4() + '.json';
            fs.writeFile(downloadPath + userFilename, JSON.stringify((userExport)), function (err) {
                if (err) {
                    return next('Unable to stream User Export file\n' + err);
                }
                else {
                    resourceLocations["userResourceLocation"] = userFilename;
                    //Holla back...
                    res.json(resourceLocations);
                }
            });
        }
    });
});

//Reset MongoDB to demo state...
router.post('/resetmongodb', function (req, res, next) {
    Sprint.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        else {
            var sprints = [
                {"_id": mongoose.Types.ObjectId("54fcfa852429fb730c93c7e7"), "team_id": mongoose.Types.ObjectId("54f6912b80b4fa1800194225"), "project_id": mongoose.Types.ObjectId("54f66a5214a3a132147e6c2c"), "planned_points": 20, "actual_points": 20, "start_date": new Date("2015-02-25T00:00:00.000Z"), "end_date": new Date("2015-03-11T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 18, "research_spike_points": 2, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T01:42:29.190Z")},
                {"_id": mongoose.Types.ObjectId("54fceb5593c75e17004656c6"), "team_id": mongoose.Types.ObjectId("54f6911680b4fa1800194223"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 28, "actual_points": 26, "start_date": new Date("2014-09-03T00:00:00.000Z"), "end_date": new Date("2014-09-17T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 20, "research_spike_points": 2, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:37:41.420Z")},
                {"_id": mongoose.Types.ObjectId("54fceb3393c75e17004656c5"), "team_id": mongoose.Types.ObjectId("54f6910b80b4fa1800194222"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 18, "actual_points": 18, "start_date": new Date("2014-09-03T00:00:00.000Z"), "end_date": new Date("2014-09-17T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 18, "research_spike_points": null, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:37:07.297Z")},
                {"_id": mongoose.Types.ObjectId("54fceb0d93c75e17004656c4"), "team_id": mongoose.Types.ObjectId("54f690fd80b4fa1800194221"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 22, "actual_points": 26, "start_date": new Date("2014-09-03T00:00:00.000Z"), "end_date": new Date("2014-09-17T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 18, "research_spike_points": 6, "new_defects": 1, "new_escapes": 2, "total_remaining_defects": 4, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:36:29.497Z")},
                {"_id": mongoose.Types.ObjectId("54fcec7e93c75e17004656c9"), "team_id": mongoose.Types.ObjectId("54f6910b80b4fa1800194222"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 21, "actual_points": 20, "start_date": new Date("2014-08-20T00:00:00.000Z"), "end_date": new Date("2014-09-03T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 18, "research_spike_points": 3, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:42:38.256Z")},
                {"_id": mongoose.Types.ObjectId("54fcde7493c75e17004656c3"), "team_id": mongoose.Types.ObjectId("54f690fd80b4fa1800194221"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 20, "actual_points": 20, "start_date": new Date("2014-08-20T00:00:00.000Z"), "end_date": new Date("2014-09-03T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 20, "research_spike_points": null, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-08T23:42:44.641Z")},
                {"_id": mongoose.Types.ObjectId("54fcecb093c75e17004656ca"), "team_id": mongoose.Types.ObjectId("54f6911680b4fa1800194223"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 24, "actual_points": 24, "start_date": new Date("2014-08-20T00:00:00.000Z"), "end_date": new Date("2014-09-03T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 20, "research_spike_points": 4, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:43:28.981Z")},
                {"_id": mongoose.Types.ObjectId("54fcf634e917111700e9f996"), "team_id": mongoose.Types.ObjectId("54f6912b80b4fa1800194225"), "project_id": mongoose.Types.ObjectId("54f66a5214a3a132147e6c2c"), "planned_points": 18, "actual_points": 16, "start_date": new Date("2014-08-06T00:00:00.000Z"), "end_date": new Date("2014-08-20T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 14, "research_spike_points": 2, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T01:24:04.769Z")},
                {"_id": mongoose.Types.ObjectId("54fcde5193c75e17004656c2"), "team_id": mongoose.Types.ObjectId("54f690fd80b4fa1800194221"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 22, "actual_points": 24, "start_date": new Date("2014-08-06T00:00:00.000Z"), "end_date": new Date("2014-08-20T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 20, "research_spike_points": 4, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-08T23:42:09.107Z")},
                {"_id": mongoose.Types.ObjectId("54fcec3093c75e17004656c7"), "team_id": mongoose.Types.ObjectId("54f6911680b4fa1800194223"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 26, "actual_points": 24, "start_date": new Date("2014-08-06T00:00:00.000Z"), "end_date": new Date("2014-08-20T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 20, "research_spike_points": null, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:41:20.182Z")},
                {"_id": mongoose.Types.ObjectId("54fcec5893c75e17004656c8"), "team_id": mongoose.Types.ObjectId("54f6910b80b4fa1800194222"), "project_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "planned_points": 18, "actual_points": 18, "start_date": new Date("2014-08-06T00:00:00.000Z"), "end_date": new Date("2014-08-20T00:00:00.000Z"), "non_scored_tasks": 0, "standard_story_points": 14, "research_spike_points": 2, "new_defects": null, "new_escapes": null, "total_remaining_defects": null, "__v": 0, "comments": [], "last_modified_date": new Date("2015-03-09T00:42:00.403Z")}
            ];
            Sprint.collection.insert(sprints, onInsert);
        }
    });
    Project.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        else {
            var projects = [
                {"_id": mongoose.Types.ObjectId("54f66a4914a3a132147e6c2b"), "name": "NGEN", "__v": 0, "last_modified_date": new Date("2015-03-04T02:13:29.996Z")},
                {"_id": mongoose.Types.ObjectId("54f66a5214a3a132147e6c2c"), "name": "The Vault", "__v": 0, "last_modified_date": new Date("2015-03-04T02:13:38.624Z")},
                {"_id": mongoose.Types.ObjectId("54f66a6a14a3a132147e6c2d"), "name": "Dealer Portal", "__v": 0, "last_modified_date": new Date("2015-03-04T02:14:02.236Z")},
                {"_id": mongoose.Types.ObjectId("54f66a7514a3a132147e6c2e"), "name": "Dealer Mobile", "__v": 0, "last_modified_date": new Date("2015-03-04T02:14:13.383Z")},
                {"_id": mongoose.Types.ObjectId("54f66a9d14a3a132147e6c2f"), "name": "Discover", "__v": 0, "last_modified_date": new Date("2015-03-04T02:14:53.203Z")},
                {"_id": mongoose.Types.ObjectId("54f66aa614a3a132147e6c30"), "name": "Big Data/Analytics", "__v": 0, "last_modified_date": new Date("2015-03-04T02:15:02.920Z")}
            ];
            Project.collection.insert(projects, onInsert);
        }
    });
    Team.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        else {
            var teams = [
                {"_id": mongoose.Types.ObjectId("54f6912b80b4fa1800194225"), "name": "Alpha Team", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:59:23.917Z")},
                {"_id": mongoose.Types.ObjectId("54f690fd80b4fa1800194221"), "name": "Autobots", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:58:37.683Z")},
                {"_id": mongoose.Types.ObjectId("54f6912380b4fa1800194224"), "name": "Clown Committee", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:59:15.288Z")},
                {"_id": mongoose.Types.ObjectId("54f6910b80b4fa1800194222"), "name": "Honey Badgers", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:58:51.799Z")},
                {"_id": mongoose.Types.ObjectId("54faba216dcfb4c8061e4081"), "name": "Kelley Blue Book - API", "state_code": "CA", "__v": 0, "last_modified_date": new Date("2015-03-07T08:43:13.532Z")},
                {"_id": mongoose.Types.ObjectId("54faba406dcfb4c8061e4082"), "name": "Manheim AS/400 Legacy", "state_code": "GA", "__v": 0, "last_modified_date": new Date("2015-03-07T08:43:44.884Z")},
                {"_id": mongoose.Types.ObjectId("54fabc706dcfb4c8061e4087"), "name": "Manheim Eventer API", "state_code": "GA", "__v": 0, "last_modified_date": new Date("2015-03-07T08:53:04.160Z")},
                {"_id": mongoose.Types.ObjectId("54fabca06dcfb4c8061e4089"), "name": "Manheim ODS", "state_code": "GA", "__v": 0, "last_modified_date": new Date("2015-03-07T08:53:52.467Z")},
                {"_id": mongoose.Types.ObjectId("54fabc826dcfb4c8061e4088"), "name": "Manheim UX", "state_code": "GA", "__v": 0, "last_modified_date": new Date("2015-03-07T08:53:22.047Z")},
                {"_id": mongoose.Types.ObjectId("54f6911680b4fa1800194223"), "name": "Scrum Team Six", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:59:02.328Z")},
                {"_id": mongoose.Types.ObjectId("54f6915280b4fa1800194228"), "name": "Technobots", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T05:00:02.235Z")},
                {"_id": mongoose.Types.ObjectId("54f6914380b4fa1800194227"), "name": "Terminators", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:59:47.745Z")},
                {"_id": mongoose.Types.ObjectId("54f6916380b4fa1800194229"), "name": "Vegas", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T05:00:19.367Z")},
                {"_id": mongoose.Types.ObjectId("54f6913b80b4fa1800194226"), "name": "X-MEN", "state_code": "IN", "__v": 0, "last_modified_date": new Date("2015-03-04T04:59:39.767Z")},
                {"_id": mongoose.Types.ObjectId("54fabb236dcfb4c8061e4083"), "name": "vAuto Auction Genius API", "state_code": "TX", "__v": 0, "last_modified_date": new Date("2015-03-07T08:47:31.072Z")},
                {"_id": mongoose.Types.ObjectId("54fabb4f6dcfb4c8061e4085"), "name": "vAuto Auction Genius Mobile", "state_code": "TX", "__v": 0, "last_modified_date": new Date("2015-03-07T08:48:15.788Z")},
                {"_id": mongoose.Types.ObjectId("54fabb3d6dcfb4c8061e4084"), "name": "vAuto Auction Genius Web", "state_code": "TX", "__v": 0, "last_modified_date": new Date("2015-03-07T08:47:57.032Z")},
                {"_id": mongoose.Types.ObjectId("54fabc256dcfb4c8061e4086"), "name": "vAuto KBB Price Advisor Report", "state_code": "TX", "__v": 0, "last_modified_date": new Date("2015-03-07T08:51:49.335Z")}
            ];
            Team.collection.insert(teams, onInsert);
        }
    });
    User.remove({}, function (err) {
        if (err) {
            return next(err);
        }
        else {
            var users = [
                {"_id": mongoose.Types.ObjectId("54f6612bb0e6af1800b5d33d"), "name": "Andy Sandefer", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f6615fb0e6af1800b5d33e"), "name": "Russell Scheerer", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f6616cb0e6af1800b5d33f"), "name": "Chris Lenzo", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f66177b0e6af1800b5d340"), "name": "Bryan Everly", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f66182b0e6af1800b5d341"), "name": "Courtney Crispin", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f66188b0e6af1800b5d342"), "name": "Keith Willis", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f66190b0e6af1800b5d343"), "name": "Jeff Lindholm", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f6619ab0e6af1800b5d344"), "name": "Roy Stecker", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f661a8b0e6af1800b5d345"), "name": "Brian Thayer", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f661c0b0e6af1800b5d346"), "name": "Jennifer Davis", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f661d8b0e6af1800b5d347"), "name": "Tamara Schulze", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f661dfb0e6af1800b5d348"), "name": "James Kubecki", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")},
                {"_id": mongoose.Types.ObjectId("54f661e6b0e6af1800b5d349"), "name": "Eric Bartley", "__v": 0, "last_modified_date": new Date("2015-03-04T01:28:25.935Z")}
            ];
            User.collection.insert(users, onInsert);
        }
    });

    function onInsert(err, documents) {
        if (err) {
            return next(err);
        }
        else {
            console.info('%d documents were inserted!', documents.length);
        }
    }

//Respond...
    res.json({'jobStatus': 'MongoDB Refresh Complete - It\'s All Good!'});
});

module.exports = router;
