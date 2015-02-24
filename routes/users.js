//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

//All
router.get('/', function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return next(err);
        }
        else {
            res.json(users);
        }
    });
});

//Get by Id
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, post) {
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
    User.create(req.body, function (err, post) {
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
    User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
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
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
})

module.exports = router;