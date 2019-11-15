const Client = require('pg').Client

/**
 * Function to execute a given query with supplied values.
 * 
 * @param {*} query  SQL query to execute provided as a String
 * @param {*} values Values to place into the SQL query
 */
function executeQuery(query, values) {
    const client = new Client("postgres://oohprrpx:VCPIDRy5mbc2oRw7fiPqVEwDgs5GfW8R@salt.db.elephantsql.com:5432/oohprrpx");
    client.connect();
    client.query(query, values)
        .then(res => {
            console.log(res.rows);
            client.end();
        })
        .catch(e => {
            console.log(e);
            client.end();
        })
}

module.exports = {
    executeQuery: executeQuery
}