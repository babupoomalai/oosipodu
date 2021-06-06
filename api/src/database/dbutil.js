const util = require('util');
const pool = require("./database");


const query = function (query, params) {
	console.log("step :0 ");
	return pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!
		console.log("step :1 ");
		// Use the connection
		return connection.query(query, params, function (error, results, fields) {
			// When done with the connection, release it.
			console.log("step :2 ");
			connection.release();

			// Handle error after the release.
			if (error) throw error;
			// console.log("released: " + results[0].id);
			return results;
		});
		console.log("step :3 ");
	});
}
module.exports.query = util.promisify(query);
