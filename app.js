//Andy Sandefer
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var projects = require('./routes/projects');
var teams = require('./routes/teams');
var sprints = require('./routes/sprints');
var users = require('./routes/users');
var system = require('./routes/system');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose connector...
var mongoose = require('mongoose');

//Todo: Alter configuration to allow hostname to be an environment variable - 'mongodb' is presently a named docker container
mongoose.connect('mongodb://mongodb/teamware', function (err) {
//mongoose.connect('mongodb://localhost/teamware', function (err) {
    if (err) {
        console.log('connection error', err);
    }
    else {
        console.log('teamware connection successful');
    }
});

app.use(favicon(__dirname + '/public/images/favicons/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routing...
app.use('/', routes);

//Page Routes...
app.use('/views/about', routes);
app.use('/views/projects', routes);
app.use('/views/help', routes);
app.use('/views/teams', teams);
app.use('/views/teamdistributionbystate', teams);
app.use('/views/sprints', sprints);
app.use('/views/sprintsbyteam', sprints);
app.use('/views/actualvsplannedbyteam', sprints);
app.use('/views/actualvsplannedbyproject', sprints);
app.use('/views/users', users);
app.use('/views/system', system);

//API Routes
app.use('/projects', projects);
app.use('/teams', teams);
app.use('/sprints', sprints);
app.use('/users', users);
app.use('/system', system);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
