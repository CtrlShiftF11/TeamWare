//Andy Sandefer
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var util = require('util');
var uuid = require('uuid');

var routes = require('./routes/index');
var projects = require('./routes/projects');
var teams = require('./routes/teams');
var sprints = require('./routes/sprints');
var users = require('./routes/users');
var uploads = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose connector...
var mongoose = require('mongoose');

// I'd like to have this hostname passed in through ENV var
//   Currently though 'mongodb' is the name of one of the Docker
//   containers running through docker-compose
mongoose.connect('mongodb://mongodb/teamware', function (err) {
    if (err) {
        console.log('connection error', err);
    }
    else {
        console.log('teamware connection successful');
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    dest: "./uploads/",
    rename: function (fieldname, filename, req, res) {
        var sess = req.session;
        var parsedFilename = filename.split["."];
        console.log('inside rename');
        console.log(req);
        return 'user' + sess.userPhotoFilename + parsedFilename[1].toString();
        //test
    }

}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Management...
//Todo: This is using MemoryStore by default for session management but needs to eventually be switched to connect-redis
app.use(session({
    genid: function (req) {
        return uuid.v4();
    },
    secret: 'ams02161975ctrlshiftf11',
    saveUninitialized: false,
    resave: false
}));
app.post('/setuserphotofilename', function (req, res, next) {
    var sess = req.session;
    sess.userPhotoFilename = req.body.userPhotoFilename;
    res.json(sess.userPhotoFilename);
});
app.get('/getuserphotofilename', function (req, res, next) {
    var sess = req.session;
    res.json(sess.userPhotoFilename);
});

//Routing...
app.use('/', routes);

//Page Routes...
app.use('/views/about', routes);
app.use('/views/projects', routes);
app.use('/views/teams', teams);
app.use('/views/teamdistributionbystate', teams);
app.use('/views/sprints', sprints);
app.use('/views/sprintsbyteam', sprints);
app.use('/views/actualvsplannedbyteam', sprints);
app.use('/views/actualvsplannedbyproject', sprints);
app.use('/views/users', users);
app.use('/views/uploadfile', uploads);

//API Routes
app.use('/projects', projects);
app.use('/teams', teams);
app.use('/sprints', sprints);
app.use('/users', users);
app.use('/uploads', uploads);

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
