//Andy Sandefer
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { title: 'TeamWare | Home' });
});

router.get('/index', function (req, res) {
    res.render('index', { title: 'TeamWare | Home' });
});

router.get('/views/index', function (req, res) {
    res.render('index', { title: 'TeamWare | Home' });
});

router.get('/views/about', function (req, res) {
    res.render('about', { title: 'TeamWare | About' });
});

router.get('/views/system', function (req, res) {
    res.render('system', {title: 'TeamWare | System'});
});

router.get('/views/help', function (req, res) {
    res.render('help', {title: 'TeamWare | Help'});
});

router.get('/views/users', function (req, res) {
    res.render('users', { title: 'TeamWare | Users' });
});

router.get('/views/projects', function (req, res) {
    res.render('projects', {title: 'TeamWare | Projects' });
});

router.get('/views/teams', function (req, res) {
    res.render('teams', { title: 'TeamWare | Teams' });
});

router.get('/views/sprints', function (req, res) {
    res.render('sprints', { title: 'TeamWare | Sprints' });
});

router.get('/views/sprintsbyteam', function (req, res) {
    res.render('sprintsbyteam', {title: 'TeamWare'});
});

router.get('/views/actualvsplannedbyteam', function (req, res) {
    res.render('actualvsplannedbyteam', {title: 'TeamWare'});
});

router.get('/views/actualvsplannedbyproject', function (req, res) {
    res.render('actualvsplannedbyproject', {title: 'TeamWare'});
});

router.get('/views/teamdistributionbystate', function (req, res) {
    res.render('teamdistributionbystate', {title: 'TeamWare' });
});

router.get('/views/executivedashboard', function (req, res) {
    res.render('executivedashboard', { title: 'TeamWare' });
});

router.get('/views/jiraburndown', function(req, res){
    res.render('jiraburndown', { title: 'TeamWare'});
});

module.exports = router;
