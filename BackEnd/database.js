// database.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING
});

module.exports = pool;