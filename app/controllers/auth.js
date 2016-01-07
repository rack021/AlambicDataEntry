var util = require('../../utilities/util');
var User = require('../../app/models/user');
var jwt = require('jsonwebtoken');
var app = require('../../server.js');

exports.authenticate = function (req, res) {
    var query = req.body;
    if (util.isParamsNullOrEmpty(query)) {
        res.json({
            success: false,
            message: 'Authentication failed. Bad Input.'
        });
    } else {
        User.findOne({
            name: query.name
        }, function (err, user) {
            if (!err) {
                console.log(user);
                if (user) {

                    if (user.password == util.hashIt(query.password)) {
                        var token = jwt.sign(user, app.get('superSecret'), {
                            expiresInMinutes: 1440 // expires in 24 hours
                        });
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                    } else {
                        res.status(401);
                        res.json({
                            success: false,
                            message: 'Authentication failed. Password Not Matched.'
                        });
                    }

                } else {
                    res.status(401);
                    res.json({
                        success: false,
                        message: 'Authentication failed. User Not Found'
                    });
                }
            } else {
                res.status(401);
                res.json({
                    success: false,
                    message: 'Serve Error. Try Again Later.'
                });
            }
        });
    }
}