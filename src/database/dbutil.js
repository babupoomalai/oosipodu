const util = require('util');
const pool = require("./database");


const query = function (query, params) {
	return pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!
		console.log(`dbutils query: ${query}`);
		// Use the connection
		return connection.query(query, params, function (error, results, fields) {
			// When done with the connection, release it.
			// console.log("dbutils fetched ");
			connection.release();

			// Handle error after the release.
			if (error) throw error;
			return results;
		});
	});
}
module.exports.query = util.promisify(query);
