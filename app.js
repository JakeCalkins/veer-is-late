var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var db = require('./database/db')
var courseHandler = require('./database/courseHandler')
var async = require('async')

app.use(bodyParser.json())

// Basic Query Examples
//db.executeQuery("Select cname, cnum from course", null);
//db.executeQuery("Select first_name from student where sid = $1", [1]);