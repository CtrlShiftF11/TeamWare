//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var JiraSettings = require('../models/JiraSettings');
var JiraIssue = require('../models/JiraIssue');

var https = require('https');
var util = require('util');

//Source
//All "/source" routes are gathering data from JIRA and inserting/updating the TeamWare MongoDB
router.get('/source', function(req, res, next){
    var qry = JiraSettings.find().limit(1);
    qry.exec(function(err, JiraSettings){
        if (err){
            return next(err);
        }
        else{
            var jql = "project=" + req.query.projectId + " AND updated >= " + "'" + req.query.startDate + "'" + " AND updated <= " + "'" + req.query.endDate + "'" + " AND issuetype=Story AND 'Story Points' IS NOT EMPTY ORDER BY updated DESC";
            var fields = "project,issuetype,id,key,summary,epic,description,status,customfield_10002,customfield_10600,issuetype,customfield_11901,sprint,updated,created";
            var options = {
                host: JiraSettings[0].root_api_url,
                path: "/rest/api/2/search?jql=" + encodeURIComponent(jql) + '&fields=' + encodeURIComponent(fields) + '&startAt=0&maxResults=500',
                auth: "asandefer:smolder1",
                port: 443
            };
            var body = '';
            https.get(options, function(jiraRes){
                jiraRes.on('data', function(d){
                    body += d;
                });
                jiraRes.on('end', function(e){
                    var bodyObj = JSON.parse(body);
                    //console.log(util.isArray(bodyObj["issues"]));
                    for (var i = 0; i < bodyObj["issues"].length; i++){
                        //console.log(bodyObj["issues"][i]["key"].toString());
                        var qry = { id: bodyObj["issues"][i]["id"]};
                        JiraIssue.findOneAndUpdate(qry, bodyObj["issues"][i], { upsert: true}, function(err, doc){
                           if (err){
                               next(err);
                           }
                           else {
                               console.log("oh yeah - the upsert is complete!!!");
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

router.get('/', function(req, res, next){
    var qry = JiraIssue.find();
    qry.exec(function(err, JiraIssues){
        if (err){
            return next(err);
        }
        else{
            res.json(JiraIssues);
        }
    });
});

router.get('/burndown', function(req, res, next){
    var startDateParts = req.query.startDate.split('/');
    var startDate = new Date(startDateParts[0], startDateParts[1] - 1, startDateParts[2]);
    console.log(startDateParts);
    console.log(startDate);
    var endDateParts = req.query.endDate.split('/');
    var endDate = new Date(endDateParts[0], endDateParts[1] - 1, endDateParts[2]);
    console.log('project is ' + req.query.projectId);
    console.log('here comes the var');
    console.log({"fields.project.key" : req.query.projectId , "fields.updated": {"$gte": startDate.toISOString(), "$lte": endDate.toISOString()}});
    var qry = JiraIssue.find({"fields.project.key" : req.query.projectId , "fields.updated": {"$gte": startDate.toISOString(), "$lte": endDate.toISOString()}});

    qry.exec(function(err, JiraIssues){
        if (err){
            return next(err);
        }
        else{
            res.json(JiraIssues);
        }
    });
});

module.exports = router;