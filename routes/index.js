var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'TeamWare | Home' });
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

module.exports = router;
