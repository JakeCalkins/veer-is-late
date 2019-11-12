var pg = require('pg');

var connection = "postgres://pcbhbjxr:AiaTJ3r7BSJJLfx-bfauVsrImRA1X6u8@salt.db.elephantsql.com:5432/pcbhbjxr";

var client = new pg.Client(connection);

client.connect(function(err) {
    if (err) {
        console.log(err);
    } 
    console.log("Connection successful... querying\n");
    client.query("SELECT * FROM STUDENTS", function(err, result) {
        if (err) {
            return console.error("error running query", err);
        }
        console.log(result.rows[0]);
        client.end();
    });
});