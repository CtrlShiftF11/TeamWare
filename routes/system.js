//Andy Sandefer
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var Project = require('../models/Project.js');
var Sprint = require('../models/Sprint.js');
var Team = require('../models/Team.js');
var User = require('../models/User.js');

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
function onInsert(err, documents) {
    if (err) {
        return next(err);
    }
    else {
        console.info('%docs documents were inserted!', documents.length);
    }
}
router.post('/resetmongodb', function (req, res, next) {
    Sprint.remove({}, function (err) {
        if (err) {
            return next(err);
        }
    });
    Project.remove({}, function (err) {
        if (err) {
            return next(err);
        }
    });
    Team.remove({}, function (err) {
        if (err) {
            return next(err);
        }
    });
    User.remove({}, function (err) {
        if (err) {
            return next(err);
        }
    });

    var users = [
        {"_id": "54f6612bb0e6af1800b5d33d", "name": "Andy Sandefer", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f6615fb0e6af1800b5d33e", "name": "Russell Scheerer", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f6616cb0e6af1800b5d33f", "name": "Chris Lenzo", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f66177b0e6af1800b5d340", "name": "Bryan Everly", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f66182b0e6af1800b5d341", "name": "Courtney Crispin", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f66188b0e6af1800b5d342", "name": "Keith Willis", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f66190b0e6af1800b5d343", "name": "Jeff Lindholm", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f6619ab0e6af1800b5d344", "name": "Roy Stecker", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f661a8b0e6af1800b5d345", "name": "Brian Thayer", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f661c0b0e6af1800b5d346", "name": "Jennifer Davis", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f661d8b0e6af1800b5d347", "name": "Tamara Schulze", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f661dfb0e6af1800b5d348", "name": "James Kubecki", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"},
        {"_id": "54f661e6b0e6af1800b5d349", "name": "Eric Bartley", "__v": 0, "last_modified_date": "2015-03-04T01:28:25.935Z"}
    ];
    User.collection.insert(users, onInsert);

    var projects = [
        {"_id": "54f66a4914a3a132147e6c2b", "name": "NGEN", "__v": 0, "last_modified_date": "2015-03-04T02:13:29.996Z"},
        {"_id": "54f66a5214a3a132147e6c2c", "name": "The Vault", "__v": 0, "last_modified_date": "2015-03-04T02:13:38.624Z"},
        {"_id": "54f66a6a14a3a132147e6c2d", "name": "Dealer Portal", "__v": 0, "last_modified_date": "2015-03-04T02:14:02.236Z"},
        {"_id": "54f66a7514a3a132147e6c2e", "name": "Dealer Mobile", "__v": 0, "last_modified_date": "2015-03-04T02:14:13.383Z"},
        {"_id": "54f66a9d14a3a132147e6c2f", "name": "Discover", "__v": 0, "last_modified_date": "2015-03-04T02:14:53.203Z"},
        {"_id": "54f66aa614a3a132147e6c30", "name": "Big Data/Analytics", "__v": 0, "last_modified_date": "2015-03-04T02:15:02.920Z"}
    ];
    Project.collection.insert(projects, onInsert);

    var teams = [
        {
            "_id": "54f690fd80b4fa1800194221",
            "name": "Autobots",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:58:37.683Z"
        },
        {
            "_id": "54f6910b80b4fa1800194222",
            "name": "Honey Badgers",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:58:51.799Z"
        },
        {
            "_id": "54f6911680b4fa1800194223",
            "name": "Scrum Team Six",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:59:02.328Z"
        },
        {
            "_id": "54f6912380b4fa1800194224",
            "name": "Clown Committee",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:59:15.288Z"
        },
        {
            "_id": "54f6912b80b4fa1800194225",
            "name": "Alpha Team",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:59:23.917Z"
        },
        {
            "_id": "54f6913b80b4fa1800194226",
            "name": "X-MEN",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:59:39.767Z"
        },
        {
            "_id": "54f6914380b4fa1800194227",
            "name": "Terminators",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T04:59:47.745Z"
        },
        {
            "_id": "54f6915280b4fa1800194228",
            "name": "Technobots",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T05:00:02.235Z"
        },
        {
            "_id": "54f6916380b4fa1800194229",
            "name": "Vegas",
            "state_code": "IN",
            "__v": 0,
            "last_modified_date": "2015-03-04T05:00:19.367Z"
        }
    ];
    Team.collection.insert(teams, onInsert);

    res.json({'jobStatus': 'MongoDB Refresh Complete - It\'s All Good!'});
});

module.exports = router;