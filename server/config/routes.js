var courseHandler = require('../courses/courseHandler');

module.exports = function(app, express) {

    // GET request for ARR given SID
    app.get('/api/academic', courseHandler.getARR);

    // GET request for schedule processing
    app.get('/api/schedule', function(req, res) {
        // Use python shell to run shedule builder
        var PythonShell = require('python-shell').PythonShell;
        var pyshell = new PythonShell('/Users/MatthewGimlewicz/Documents/veer-is-late/server/config/test.py');

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err){
                console.log(err);
            };
        });
    });

};