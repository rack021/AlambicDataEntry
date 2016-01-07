// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
// get our mongoose model
var util = require('./utilities/util');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public_html', {
    maxAge: 86400000
}));



// =======================
// start the server ======
// =======================
app.use(require('./admin/adminRoute.js'));
app.use(require('./routes/authentication.js'));
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public_html/index.html');
});

app.listen(port);
console.log('Magic happenss at http://localhost:' + port);