var db = require('../../database/db');
var fs = require('fs')

function getCredits(req, response) {


    console.log(req.query.mc);
    console.log(req.query.cd);
    console.log("THIS IS A TEST");


    let m = req.query.m;
    let t = req.query.t;
    let w = req.query.w;
    let th = req.query.th;
    let f = req.query.f;

    var days = []
    if (m){
        days.push("M");
    }
    if (t){
        days.push("T");
    }
    if (w){
        days.push("W");
    }
    if (th){
        days.push("TH");
    }
    if (f){
        days.push("F");
    }


    let jsonObj = {
        min_credits: req.query.mincredits,
        max_credits: req.query.maxcredits,
        day_settings: {
            days,
            mode: "before",
            time: "12:30"
        },
        honors_class: req.query.honors,
        online_class: req.query.online,
        independent_class: req.query.independent,
        in_major_count: req.query.majclass,
        seminar_class: req.query.sem
    }

    // http://localhost:1337/api/test?$mincredits=2&maxcredits=12&m=true&m=false&m=true&m=false&m=true&honors=false&online=false&independent=false&majclass=3&sem=1

    // Writes json data to output file
    fs.writeFile('./server/courses/settings.json', JSON.stringify(jsonObj), 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    })

    response.json(jsonObj);
    response.send();
}

module.exports = {
    getCredits: getCredits
}