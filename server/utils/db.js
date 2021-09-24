import mysql from 'mysql2';
import config from './config.js';

// create a connection pool
const pool = mysql.createPool({
	user: config.MYSQL_USER,
	host: config.MYSQL_HOST,
	password: config.MYSQL_PASSWORD,
	database: config.MYSQL_DATABASE,
});

// wrapping the pool in a Promise
const promisePool = pool.promise();

export default promisePool;
