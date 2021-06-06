var mysql = require('mysql');

const pool = mysql.createPool({
	host: 'qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'p41a235bhzcc90jg',
	password: 'q0wpymc2btta5cg7',
	database: 'xgyp26hg2huzcr3u',
	connectTimeout: 1000,
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
