//Andy Sandefer
var express = require('express');
var router = express.Router();

var Test = require('../models/test.js');

router.get('/', function(req, res, next){
    new Test().fetchAll()
        .then(function(tests){
            res.json(tests);
        })
        .catch(function(err){
            return next(err);
        });
});