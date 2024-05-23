const { request, response } = require('express')

const { pool } = require("../index")

//////////////////////////////////////////////////////////////////////////////////
// Favorite Table Query
const getFavMealsById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT recipe_name FROM favorite_meals WHERE user_id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows)
    });
};

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
    getFavMealsById,
    addFavMeal,
    deleteFavMeal
}