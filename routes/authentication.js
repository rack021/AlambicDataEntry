var url = require("url");
var path = require('path');
var User = require('../app/models/user');
var express = require('express'),
    router = express.Router()
var authController = require('../app/controllers/auth');
var jwt = require('jsonwebtoken');
app = require('../server.js');



router.post('/authenticate', authController.authenticate);

var isAuth = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

};


router.get('/api/check', isAuth, function (req, res) {
    res.json(req.decoded);
})

module.exports = router