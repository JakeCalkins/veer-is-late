var db = require('./db');

// Handle GET requests for Courses
function getARR(req, res) {

    // Retreive studentID from the request's queryString
    var sid = req.query.sid;

    // Pull ARR from database, returns a JSON object
    db.executeQuery("SELECT arr FROM Student WHERE sid = $1", [sid], function(err, res) {
        if (err) {
            console.log(err);
        }

        // JSON object storing ARR
        var json = res.rows[0];

        // Store satisfied and unsatisfied courses from ARR
        var satisfied_courses = []
        var unsatisfied_courses = []

        // Parse ARR
        json.major_requirements.courses.forEach(function (course) {
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
    });

}

module.exports = {
    getARR: getARR
}