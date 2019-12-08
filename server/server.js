var express = require('express');
var routes = require('./config/routes.js')

// start express
var app = express();

// set routes
routes(app, express)

// export app
module.exports = app;