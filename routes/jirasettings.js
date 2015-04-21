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

router.post('/', function(req, res, next){
    var qry = { _id: req.params.id };
    JiraSettings.findOneAndUpdate(qry, req.body, {upsert: true}, function(err, doc){
        if (err){
            next(err);
        }
        else{
            res.json(res.body);
        }
    });
});

module.exports = router;