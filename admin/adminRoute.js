var url = require("url");
var path = require('path');
var User = require('../app/models/user');
var express = require('express'),
    router = express.Router()

router.get('/admin/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});


module.exports = router