var db = require('../../database/db');
var fs = require('fs')

function getARR(req, response) {

    // Retreive studentID from the request's queryString
    var sid = req.query.sid;

    // Initialize variables to store query results
    let req_report, req_courses;

    // Store satisfied and unsatisfied courses during parsing
    let satisfied = [], unsatisfied = [];

    var pullARR = (err, res) => {
        if (err) {
            return console.log(err);
        }
        // Handle case where student id is not valid
        if (res.rows.length == 0) {
            console.log(`Student with ID ${sid} does not exist`);
            response.send();
        }

        req_report = res.rows[0].arr;
        console.log(`\nPulling academic requirements for student with id ${sid} ...`);
    }

    // Pull ARR from database, returns a JSON object
    db.executeQuery("SELECT arr FROM Students WHERE sid = $1", [sid], pullARR)
    .then(function() {

        // Extract the student major
        req_major = req_report.major_requirements.major;

        // Extract the student's REQUIRED major courses
        req_courses = req_report.major_requirements.courses;

        // Extract the student's upper level electives (300+)
        req_300_electives = req_report.major_requirements.mid_level_electives;

        // Extract the student's upper level electives (400+)
        req_400_electives = req_report.major_requirements.upper_level_electives;

        // Extract required geneds
        req_geneds = req_report.major_requirements.gened_requirements;

        // Promise ensures we run queries sequentially
        var promise = Promise.resolve();

        req_courses.forEach(function(course, index, array) {

            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {

                // Executable SQL to pull courses
                var sql = "SELECT DISTINCT c.major, c.cnum " + 
                          "FROM Courses c " +
                          "WHERE c.cnum = $1 AND c.major = $2"
                
                // If major is SQL also consider CICS courses
                if (req_major == 'COMPSCI') {
                    sql += "OR (c.major = 'CICS' and c.cnum = $1)"
                }
                
                // Execute the query with the course number and major
                db.executeQuery(sql, [course.cnum, req_major], function(err, res) {

                    if (err) {
                        return console.log(err);
                    }

                    if (res == null) {
                        console.log("Required courses are NOT found\n");
                    }
                    
                    var queryResults = res.rows;

                    // Handles courses that are not yet in the DB
                    if (queryResults.length == 0) {
                        console.log("Course NOT FOUND " + course);
                    } else {

                        var completed = course.is_satisfied;
                
                        // courseInfo = { major, cnum }
                        var courseInformation = res.rows[0];

                        if (completed)
                            satisfied.push(courseInformation);
                        else if (course.take_immediately)
                            unsatisfied.push(courseInformation);
                    }
                });
                return new Promise(function(resolve) {
                    // Prevent more than 5 concurrent connections for ElephantSQL
                    setTimeout(resolve, 300);
                });
            });
        });

        req_400_electives.forEach(function(course, index, array) {

            promise = promise.then(function() {

                // Find courses in the major that begin with 400
                var sql = "SELECT DISTINCT c.major, c.cnum " + 
                          "FROM Courses c " +
                          "WHERE (c.cnum like '4%' AND c.major = $1) OR (c.cnum like '3%' AND c.major = $1)";

                db.executeQuery(sql, [req_major], function(err, res) {

                    if (err) {
                        return console.log(err);
                    }

                    if (res == null) {
                        console.log("400 level courses are NOT found\n");
                    }

                    if (res.rows.length == 0) {
                        console.log("Course NOT FOUND " + course);
                    } else {
                        
                        var completed = course.is_satisfied;

                        // { major, cnum }
                        var courseInformation;
                        var queryResults = res.rows;

                        var upper_satisfied = []


                        for (var i = 0; i < queryResults.length; i++) {

                            if (completed && queryResults[i].major == req_major && queryResults[i].cnum == course.cnum) {
                                upper_satisfied.push(queryResults[i]);
                                break;
                            }
        
                        }

                        if (index == array.length - 1) {

                            let jsonObj = {
                                required_courses: {
                                    satisfied: satisfied,
                                    unsatisfied: unsatisfied
                                },
                                upper_level_courses: {
                                    available: {
                                        courses: queryResults,
                                        take_immediately: false
                                    },
                                    required: 9
                                },
                                geneds: req_geneds
                            }

                            response.json({
                                required_courses: {
                                    satisfied: satisfied,
                                    unsatisfied: unsatisfied
                                },
                                upper_level_courses: {
                                    available: {
                                        courses: queryResults,
                                        take_immediately: false
                                    },
                                    required: 9
                                },
                                geneds: req_geneds
                            });

                            // Writes json data to output file
                            fs.writeFile('./server/courses/output.json', JSON.stringify(jsonObj), 'utf8', function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            })

                            response.send()
                        }
                    }
                });
                return new Promise(function(resolve) {
                    // Prevent more than 5 concurrent connections for ElephantSQL
                    setTimeout(resolve, 300);
                });
            });
        });
    });
}

module.exports = {
    getARR: getARR
}