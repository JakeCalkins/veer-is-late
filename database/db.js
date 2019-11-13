var pg = require('pg');

var connection = "postgres://oohprrpx:VCPIDRy5mbc2oRw7fiPqVEwDgs5GfW8R@salt.db.elephantsql.com:5432/oohprrpx";

var client = new pg.Client(connection);

client.connect(function(err) {
    if (err) {
        console.log(err);
    } 
    console.log("Connection successful... querying\n");
    client.query("SELECT * FROM Course", function(err, result) {
        if (err) {
            return console.error("error running query", err);
        }
        console.log("-----------------------------------\n")
        result.rows.forEach(function(row) {
            console.log("Course number: " + row.cnum + "\n");
            console.log("Course name: " + row.name + "\n");
            console.log("Credits: " + row.credits + "\n");
            console.log("-----------------------------------\n")
        });
        console.log(result.rows);
        client.end();
    });
});