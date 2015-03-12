//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var JiraSettings = require('../models/JiraSettings.js');

//All - Please note that this is a 1 record setup table!
router.get('/', function (req, res, next) {
    var qry = JiraSettings.find().limit(1);
    qry.exec(function (err, JiraSettings) {
        if (err) {
            return next(err);
        }
        else {
            res.json(JiraSettings);
        }
    });
});


module.exports = router;