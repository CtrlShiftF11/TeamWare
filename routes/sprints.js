//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Sprint = require('../models/Sprint.js');

//All
router.get('/', function (req, res, next) {
    Sprint.find(function (err, Sprints) {
        if (err) {
            return next(err);
        }
        else {
            res.json(Sprints);
        }
    });
});

//Get by Id
router.get('/:id', function (req, res, next) {
    Sprint.findById(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Get by TeamId and Order by Sprint End Date
router.get('/getbyteam/:team_id', function (req, res, next) {
    var query = Sprint.find({"team_id": req.params.team_id}).sort({"end_date": 1});
    query.exec(function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Create
router.post('/', function (req, res, next) {
    Sprint.create(req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Update by Id
router.put('/:id', function (req, res, next) {
    Sprint.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

//Delete by Id
router.delete('/:id', function (req, res, next) {
    Sprint.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
})

module.exports = router;