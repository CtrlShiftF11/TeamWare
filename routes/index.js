var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'TeamWare' });
});

router.get('/views/projects', function (req, res) {
    res.render('projects', {title: 'TeamWare' });
});

router.get('/views/teams', function (req, res) {
    res.render('teams', { title: 'TeamWare' });
});

router.get('/views/sprints', function (req, res) {
    res.render('sprints', { title: 'TeamWare' });
});

module.exports = router;
