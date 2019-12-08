var db = require('../../database/db');

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
            response.err("ERROR")
            response.send();
        }

        req_report = res.rows[0].arr;
        console.log(`\nPulling academic requirements for student with id ${sid} ...`);
    }

    var fetchCourses = (courseList) => {
        var promise = Promise.resolve();
        courseList.forEach(function(course, index, array) {
            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {
                db.executeQuery(
                    "SELECT DISTINCT c.major, c.cnum " + 
                    "FROM Courses c INNER JOIN Professors p ON c.pid = p.pid " +
                    "WHERE c.cnum = $1 AND c.major = $2 OR (c.major = 'CICS' and c.cnum = $1)", [course.cnum, req_major], function(err, res) {
                        if (err) {
                            return console.log(err);
                        }
                        if (res != null) {
                            // Handles courses that are not yet in the DB
                            if (res.rows.length == 0) {
                                console.log(course)
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
                                    console.log("\nSATISFIED\n")
                                    console.log(satisfied)

                                    console.log("\nUNSATISFIED\n")
                                    console.log(unsatisfied)
                                    satisfied = []
                                    unsatisfied = []
                                    //return res;
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

        //fetchCourses(req_courses);
        //fetchCourses(req_300_electives);
        //fetchCourses(req_400_electives);

        var promise = Promise.resolve();

        req_courses.forEach(function(course, index, array) {

            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {
                db.executeQuery(
                    "SELECT DISTINCT c.major, c.cnum " + 
                    "FROM Courses c INNER JOIN Professors p ON c.pid = p.pid " +
                    "WHERE c.cnum = $1 AND c.major = $2 OR (c.major = 'CICS' and c.cnum = $1)", [course.cnum, req_major], function(err, res) {
                        if (err) {
                            return console.log(err);
                        }
                        if (res != null) {
                            // Handles courses that are not yet in the DB
                            if (res.rows.length == 0) {
                                console.log(course)
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
                                    console.log("\nSATISFIED\n")
                                    console.log(satisfied)

                                    console.log("\nUNSATISFIED\n")
                                    console.log(unsatisfied)
                                    satisfied = []
                                    unsatisfied = []
                                    //return res;
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

        req_400_electives.forEach(function(course, index, array) {

            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {
                db.executeQuery(
                    "SELECT DISTINCT c.major, c.cnum " + 
                    "FROM Courses c INNER JOIN Professors p ON c.pid = p.pid " +
                    "WHERE c.cnum like '4%' AND c.major = $1", [req_major], function(err, res) {
                        if (err) {
                            return console.log(err);
                        }
                        if (res != null) {
                            // Handles courses that are not yet in the DB
                            if (res.rows.length == 0) {
                                console.log("COURSE NOT FOUND IN DATABASE\n")
                                unsatisfied.push(course.major, course.cnum);
                            } else {
                                // Determine if course is satisfied and add course information
                                var courseInfo;
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (satisfied.includes(res.rows[i]))
                                        continue;
                                    if (unsatisfied.includes(res.rows[i].cid))
                                        continue;
                                    courseInfo = res.rows[i];
                                    break;
                                }
                                if (course.is_satisfied) {
                                    satisfied.push(courseInfo.major, courseInfo.cnum);
                                } else {
                                    unsatisfied.push(courseInfo.major, courseInfo.cnum);
                                }
                                // Log output to console
                                if (index == array.length - 1) {
                                    // Simulating result for an actual HTTP request
                                    res = {
                                        unsatisfied: unsatisfied,
                                        satisfied: satisfied
                                    }
                                    console.log("\nSATISFIED\n")
                                    console.log(satisfied)

                                    console.log("\nUNSATISFIED\n")
                                    console.log(unsatisfied)
                                    unsatisfied = []
                                    satisfied = []
                                    //return res;
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

        req_300_electives.forEach(function(course, index, array) {

            // Execute query once promise is resolved
            // [imposes order on query execution]
            promise = promise.then(function() {
                db.executeQuery(
                    "SELECT DISTINCT c.major, c.cnum " + 
                    "FROM Courses c INNER JOIN Professors p ON c.pid = p.pid " +
                    "WHERE c.cnum like '3%' AND c.major = $1", [req_major], function(err, res) {
                        if (err) {
                            return console.log(err);
                        }
                        if (res != null) {
                            // Handles courses that are not yet in the DB
                            if (res.rows.length == 0) {
                                console.log("COURSE NOT FOUND IN DATABASE\n")
                                unsatisfied.push(course.cid);
                            } else {
                                // Determine if course is satisfied and add course information
                                var courseInfo;
                                for (var i = 0; i < res.rows.length; i++) {
                                    if (satisfied.includes(res.rows[i]))
                                        continue;
                                    if (unsatisfied.includes(res.rows[i].cid))
                                        continue;
                                    courseInfo = res.rows[i];
                                    break;
                                }
                                if (course.is_satisfied) {
                                    satisfied.push(courseInfo.cid);
                                } else {
                                    unsatisfied.push(courseInfo.cid);
                                }
                                // Log output to console
                                if (index == array.length - 1) {
                                    // Simulating result for an actual HTTP request
                                    res = {
                                        unsatisfied: unsatisfied,
                                        satisfied: satisfied
                                    }
                                    console.log("\nSATISFIED\n")
                                    console.log(satisfied)

                                    console.log("\nUNSATISFIED\n")
                                    console.log(unsatisfied)
                                    //return res;
                                    response.json({
                                        unsatisfied: unsatisfied,
                                        satisfied: satisfied
                                    });
                                    response.send();
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