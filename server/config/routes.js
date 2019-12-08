var courseHandler = require('../courses/courseHandler');

module.exports = function(app, express) {

    // GET request for ARR given SID
    app.get('/api/academic', courseHandler.getARR);

};