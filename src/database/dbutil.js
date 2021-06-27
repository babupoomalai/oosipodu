const util = require('util');
// const pool = require("./database");
var mysql = require('mysql');

const pool = mysql.createPool({
	host: 'us-cdbr-east-04.cleardb.com',
	user: 'bf01dca905b259',
	password: '29a925a4',
	database: 'heroku_c0cdc2c406b3622',
	connectTimeout: 5000,
	connectionLimit: 8
});

const query = function (query, params) {
	pool.getConnection((err, connection) => {
		if (err) throw err; // not connected!
		console.log(`dbutils query: ${query}`);
		// Use the connection
		connection.query(query, params, (error, results) => {
			// When done with the connection, release it.
			console.log("dbutils fetched ");
			connection.release();
			console.log("connection released")

			// Handle error after the release.
			if (error) throw error;
			return results;
		});
	});
}
module.exports.query = util.promisify(query);
