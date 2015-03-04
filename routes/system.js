//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Project = require('../models/Project.js');
var Sprint = require('../models/Sprint.js');
var Team = require('../models/Team.js');
var User = require('../models/User.js');

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

    res.json({'jobStatus': 'MongoDB Refresh Complete - It\'s All Good!'});
});

module.exports = router;