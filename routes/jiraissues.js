//Andy Sandefer
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var JiraSettings = require('../models/JiraSettings');
var JiraIssue = require('../models/JiraIssue');

var https = require('https');

//Source
router.get('/source', function(req, res, next){
    var qry = JiraSettings.find().limit(1);
    qry.exec(function(err, JiraSettings){
        if (err){
            return next(err);
        }
        else{
            var getJiraIssues = function(startAt, maxResultsPageSize){
                console.log('start ' + startAt);
                console.log('max ' + maxResultsPageSize);
                var jql = "project=" + req.query.projectId + " AND issuetype=Story AND 'Story Points' IS NOT EMPTY ORDER BY updated DESC";
                var fields = "project,issuetype,id,key,summary,epic,description,status,customfield_10002,customfield_10600,issuetype,customfield_11901,sprint,updated,created";
                var options = {
                    host: JiraSettings[0].root_api_url,
                    path: "/rest/api/2/search?jql=" + encodeURIComponent(jql) + '&fields=' + encodeURIComponent(fields) + '&startAt=' + startAt + '&maxResults=' + maxResultsPageSize,
                    auth: "asandefer:smolder1",
                    port: 443
                };
                var body = '';
                https.get(options, function(jiraRes){
                    jiraRes.on('data', function(d){
                        body += d;
                    });
                    //Replace this piece with an UPSERT!
                    jiraRes.on('end', function(e){
                        res.type('json');
                        res.send(body);
                        console.log(body);
                    });
                    jiraRes.on('error', function(e){
                        console.log('Bad stuff has occurred...\n' + e.message);
                    });
                });
            };
        }
    });
});

module.exports = router;