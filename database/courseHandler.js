var db = require('./db');

function getARR(req, res) {

    // Retreive studentID from the request's queryString
    var sid = req.query.sid;

    // Initialize variables to store query results
    let req_report, req_courses;

    // Store satisfied and unsatisfied courses during parsing
    let satisfied = [], unsatisfied = [];

    // Pull ARR from database, returns a JSON object
    db.executeQuery("SELECT arr FROM Student WHERE sid = $1", [sid], function(err, res) {
        if (err) {
            return console.log(err);
        }
        // Handle case where student id is not valid
        if (res.rows.length == 0) {
            console.log(`Student with ID ${sid} does not exist`);
        }

        req_report = res.rows[0].arr;
        console.log(`\nPulling academic requirements for student with id ${sid} ...`);
    }).then(function() {

        req_courses = req_report.major_requirements.courses;
        var promise = Promise.resolve();

        req_courses.forEach(function(course, index, array) {

            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {
                db.executeQuery(
                    "SELECT CONCAT(c.major, ' ', c.cnum) as cid, c.cname, c.start_time, c.end_time, CONCAT(p.first_name, ' ', p.last_name) as professor " + 
                    "FROM Course c INNER JOIN Professor p ON c.pid = p.pid " +
                    "WHERE c.cnum = $1", [course.cnum], function(err, res) {
                        if (err) {
                            return console.log(err);
                        }
                        if (res != null) {
                            // Handles courses that are not yet in the DB
                            if (res.rows.length == 0) {
                                unsatisfied.push(course);
                            } else {
                                // Determine if course is satisfied and add course information
                                var courseInfo = res.rows[0];
                                if (course.is_satisfied) {
                                    satisfied.push(courseInfo);
                                } else {
                                    unsatisfied.push(courseInfo);
                                }
                                // Log output to console
                                if (index == array.length - 1) {
                                    // Simulating result for an actual HTTP request
                                    res = {
                                        unsatisfied: unsatisfied,
                                        satisfied: satisfied
                                    }
                                    return res;
                                    console.log("\n SATISFIED COURSES \n")
                                    console.log(satisfied)
                                    console.log("\n UNSATISFIED COURSES \n")
                                    console.log(unsatisfied)
                                }
                            }
                        }
                });
                return new Promise(function(resolve) {
                    // ElephantSQL can only support 5 concurrent connections, so add a slight delay
                    // timeout value is 100, this is a safe value, anything less might result in missing information
                    // in output (ie. missing courses that should be there)
                    setTimeout(resolve, 300);
                });
            });
        });
    });
}

module.exports = {
    getARR: getARR
}