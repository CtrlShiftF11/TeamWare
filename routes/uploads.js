//Andy Sandefer
var express = require('express');
var router = express.Router();
var util = require('util');
var fs = require('fs');

router.get('/', function (req, res) {
    res.render('uploadfile', {title: 'File Uploader'});
});

router.post('/', function (req, res, next) {
    if (req.files) {
        //Todo: Remove the following console.log statements once I'm finished with this feature!
        console.log(util.inspect(req.files));

        if (req.files.myFile.size === 0) {
            return next(new Error('Please select a file?'));
        }
        fs.exists(req.files.myFile.path, function (exists) {
            if (exists) {
                res.end('File Upload processed');
            } else {
                res.end('Unable to process File Upload');
            }
        });
    }
});
module.exports = router;