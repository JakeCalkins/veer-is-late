var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var db = require('./database/db')
var courseHandler = require('./database/courseHandler')

app.use(bodyParser.json())

// Basic Query Examples
//db.executeQuery("Select cname, cnum from course", null);
//db.executeQuery("Select first_name from student where sid = $1", [1]);

// Extract JSON from PostgreSQL
db.executeQuery("SELECT arr FROM Student WHERE sid = $1", [12345678], function(err, res) {
    if (err) {
        console.log(err);
    } else {
        if (res.rows.length == 0) {
            console.log("Student with ID XXXXXX does not exist");
        }
        var json = res.rows[0];
        //console.log(json.arr.major_requirements);
        var satisfied_courses = []
        var unsatisfied_courses = []
        console.log("\nPulling requirements for student with id 12345678\n");
        json.arr.major_requirements.courses.forEach(function(course) {
            // For all unsatisfied course requirements
            db.executeQuery("SELECT c.cname, c.start_time, c.end_time, p.first_name, p.last_name FROM Course c INNER JOIN Professor p ON c.pid = p.pid WHERE c.cnum = $1", [course.cnum], function(err, res) {
                if (err) {
                    console.log(err);
                }
                if (!course.is_satisfied) {
                    unsatisfied_courses.push(res.rows[0]);
                } else {
                    satisfied_courses.push(res.rows[0]);
                }
            });
        });
        console.log(unsatisfied_courses)
    }
});