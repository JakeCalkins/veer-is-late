var courseHandler = require('../courses/courseHandler');

module.exports = function(app, express) {

    // GET request for ARR given SID
    app.get('/api/academic', courseHandler.getARR);

    // GET request for schedule processing
    app.get('/api/schedule', function(req, res) {
        // Use python shell to run shedule builder script
        var PythonShell = require('python-shell').PythonShell;
        var pyshell = new PythonShell('/Users/MatthewGimlewicz/Documents/veer-is-late/server/generator.py');
    });

};