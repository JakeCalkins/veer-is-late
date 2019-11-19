const Client = require('pg').Client

/**
 * Function to execute a given query with supplied values.
 * 
 * @param {*} query    SQL query to execute provided as a String
 * @param {*} values   Values to place into the SQL query
 * @param {*} callback Callback function to push error/result to
 */
function executeQuery(query, values, callback) {
    const client = new Client("postgres://oohprrpx:VCPIDRy5mbc2oRw7fiPqVEwDgs5GfW8R@salt.db.elephantsql.com:5432/oohprrpx");
    client.connect(function(err) {
        if (err) {
            return callback(err, null);
        }
    });
    client.query(query, values)
        .then(res => {
            client.end();
            return callback(null, res);
        })
        .catch(err => {
            client.end();
            return callback(err, null);
        });
}

module.exports = {
    executeQuery: executeQuery
}