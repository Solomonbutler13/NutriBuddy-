require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.CONNECTIONSTRING
});

pool.connect((error) => {
    if (error) {
        console.error("error connecting to db", error);
    } else {
        console.log("connected to db");
    }
});

module.exports = pool;
