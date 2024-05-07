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
        console.log(results.rows);
        response.status(200).send(results.rows)
    })
}

const addFavMeal = (request, response) => {
    try {
        const {
            recipe_name,
            recipe_id,
            user_id
        } = request.body;
        pool.query(
            `INSERT INTO favorite_meals (recipe_name, recipe_id, user_id) VALUES ($1, $2, $3) RETURNING *`,
            [recipe_name, recipe_id, user_id],
            (error, results) => {
                if (error) {
                    console.log(error, '<--- error here')
                    throw error;
                }
                console.log(results, '<--- results!')
                response.status(201).json(results.rows)
            }
        );
    } catch (error) {
        throw error;
    }
};

const deleteFavMeal = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`DELETE FROM favorite_meals WHERE id = ${id}`, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    getFavMealsById,
    addFavMeal,
    deleteFavMeal
}