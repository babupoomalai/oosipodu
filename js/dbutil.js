var mysql = require('mysql');

exports.getConnection = function () {
	var connection = mysql.createConnection(process.env.JAWSDB_URL);
	connection.connect();
	return connection;
}
console.log("url: " + process.env.JAWSDB_URL);
// var connection = mysql.createConnection('mysql://p41a235bhzcc90jg:q0wpymc2btta5cg7@qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/xgyp26hg2huzcr3u');
// connection.connect();
const pool = mysql.createPool({
	host: 'qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'p41a235bhzcc90jg',
	password: 'q0wpymc2btta5cg7',
	database: 'xgyp26hg2huzcr3u',
	connectTimeout: 2000,
	connectionLimit: 100
});

exports.query = function (query, params) {
	pool.getConnection(function (err, connection) {
		if (err) throw err; // not connected!

		// Use the connection
		connection.query(query, params, function (error, results, fields) {
			// When done with the connection, release it.
			connection.release();

			// Handle error after the release.
			if (error) throw error;
			return results;
		});
	});
}

