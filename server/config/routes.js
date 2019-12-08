var courseHandler = require('../courses/courseHandler');

module.exports = function(app, express) {

    // GET request for ARR given SID
    app.get('/api/academic', courseHandler.getARR);
    app.get('/api/schedule', function(req, res) {
        var spawn = require ('child_process').spawn;

        var process = spawn('python', 
                            ['../courses/scheduleHandler.py',
                            req.query.firstname,
                            req.query.lastname]);
        
        process.stdout.on('data', function(data) {
            console.log(data.toString())
            res.send(data.toString());
        })
    });

};