//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var JiraSettings = require('../models/JiraSettings.js');
var JiraProject = require('../models/JiraProject.js');

var https = require('https');

//Source
router.get('/source', function(req, res, next){
    var qry = JiraSettings.find().limit(1);
    qry.exec(function (err, JiraSettings) {
        if (err) {
            return next(err);
        }
        else {
            var options = {
                host: JiraSettings[0].root_api_url,
                path: "/rest/api/2/project/",
                auth: JiraSettings[0].basic_auth_user + ':' + JiraSettings[0].basic_auth_password,
                port: 443
            };
            var body = '';
            https.get(options, function(jiraRes){
                jiraRes.on('data', function(d){
                    body += d;
                });
                jiraRes.on('end', function(e){
                    //res.type('json');
                    //res.send(body);
                    var bodyObj = JSON.parse(body);
                    for (var i = 0; i < bodyObj.length; i++){
                        var qry = { id: bodyObj[i]["id"] };
                        JiraProject.findOneAndUpdate(qry, bodyObj[i], { upsert: true }, function(err, doc){
                            if (err){
                                next(err);
                            }
                            else{
                                console.log('JIRA project upsert is complete!');
                            }
                        });
                    }
                    //res.send({"itWorked": true});
                    res.send(bodyObj);
                });
                jiraRes.on('error', function(e){
                    console.log('Bad stuff has occurred...\n' + e.message);
                });
            });
        }
    });
});

//All
router.get('/', function (req, res, next){
    var qry = JiraProject.find().sort({"name": 1});
    qry.exec(function(err, JiraProjects) {
        if (err){
            next(err);
        }
        else{
            res.json(JiraProjects);
        }
    });
});

//Get by Id
router.get('/:id', function (req, res, next) {
    JiraProject.findById(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        else {
            res.json(post);
        }
    });
});

module.exports = router;