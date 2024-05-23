const { request, response } = require('express')

const { pool } = require("../index")

//////////////////////////////////////////////////////////////////////////////////
// Ingredients Table Query
const getIngredientsByMealId = (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM ingredients WHERE recipe_id = $1`, [id], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const addIngredients = (request, response) => {
    
    try {
        const recipe_id = request.params.id;
        const ingredientsInfo = request.body;
        let ingredientsNameArray = (ingredientsInfo['ingredients'].map(ingredients => ingredients.name))
        let ingredientsValueArray = (ingredientsInfo['ingredients'].map(ingredients => ingredients.amount.us.value));
        let ingredientsUnitArray = (ingredientsInfo['ingredients'].map(ingredients => ingredients.amount.us.unit));
        let ingredientsPriceArray = (ingredientsInfo['ingredients'].map(ingredients => ingredients.price));
        pool.query(
            `INSERT INTO ingredients (recipe_id, ingredient_name, quantity, unit_type, price_per_unit)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [recipe_id, ingredientsNameArray, ingredientsValueArray, ingredientsUnitArray, ingredientsPriceArray],
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

module.exports = {
    getIngredientsByMealId,
    addIngredients
};