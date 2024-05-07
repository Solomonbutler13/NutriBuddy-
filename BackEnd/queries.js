const { request, response } = require('express')

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nutribuddy',
    password: '',
    port: 5432,
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
        response.status(200).send(results.rows)
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