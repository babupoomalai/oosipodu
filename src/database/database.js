var mysql = require('mysql');

const pool = mysql.createPool({
	host: 'us-cdbr-east-04.cleardb.com',
	user: 'bf01dca905b259',
	password: '29a925a4',
	database: 'heroku_c0cdc2c406b3622',
	connectTimeout: 5000,
	connectionLimit: 8
});

module.exports = pool;
