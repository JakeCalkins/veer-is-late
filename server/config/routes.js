var courseHandler = require('../courses/courseHandler');
var fs = require('fs')

module.exports = function(app, express) {

    // GET request for ARR given SID
    app.get('/api/academic', courseHandler.getARR);

    // GET request for schedule processing
    app.get('/api/schedule', function(req, res) {
        console.log("Received GET request to run Python script\n");
        const { spawn } = require('child_process');
        const pyProg = spawn('python', ['./server/generate.py']);
        pyProg.on('exit', function() {
            console.log('FINISHED\n')
            fs.readFile('generated_schedules.txt', 'utf8', function(err, data){
                    // console.log(data); //OK
                    data = JSON.parse(data);
                    res.json(data);
                    res.send();
            });
        });
    });

};