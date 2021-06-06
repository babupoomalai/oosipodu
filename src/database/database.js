var mysql = require('mysql');

const pool = mysql.createPool({
	host: 'us-cdbr-east-04.cleardb.com',
	user: 'bf01dca905b259',
	password: '29a925a4',
	database: 'heroku_c0cdc2c406b3622',
	connectTimeout: 5000,
	connectionLimit: 8
});

exports.query = function (query, params) {

	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		connection.query(query, params, function (error, results, fields) {
			// When done with the connection, release it.
			connection.release();
			console.log("released");

			// Handle error after the release.
			if (error) throw error;
			return results;
		});
	});

}

module.exports = pool;
