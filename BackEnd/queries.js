require('dotenv').config();
const { request, response } = require('express');
const { connectionString } = require('pg/lib/defaults');

const { Pool } = require('pg')

console.log(process.env.DB_CONNECTION_STRING)

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
})

pool.connect((error) => {
    if (error) {
        console.error("error connecting to db", error);
    }else {
        console.log("connected to db");
    }
})

const getAllUsers = (request, response) => {
    pool.query('SELECT * FROM users',
    (error, results) => {
        if (error) {
            throw error
        }
        console.log(results);
        response.status(200).send(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if(error) {
            throw error;
        }
        console.log(results);
        response.status(200).send(results.rows[0])
    })
}

const getFavMealsById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT recipe_name FROM favorite_meals WHERE user_id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows)
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    getFavMealsById,
}