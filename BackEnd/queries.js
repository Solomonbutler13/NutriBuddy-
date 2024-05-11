const { request, response } = require('express')

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nutribuddy',
    password: 'password',
    port: 5432,
})

pool.connect((error) => {
    if (error) {
        console.error("error connecting to db", error);
    }else {
        console.log("connected to db");
    }
});
//////////////////////////////////////////////////////////////////////////////////
// Users Table Query
const getAllUsers = (request, response) => {
    pool.query('SELECT * FROM users',
    (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM users WHERE id = ${id}`, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).send(results.rows)
    })
};

const deleteUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`
        DELETE FROM meal WHERE user_id = ${id};
        DELETE FROM favorite_meals WHERE user_id = ${id};
        DELETE FROM users WHERE id = ${id};
    `, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
//////////////////////////////////////////////////////////////////////////////////
// Meals Table Query
const getUserMealsByUserId = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM meal WHERE user_id = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUsersMealsByPastDate = (request, response) => {
    const id = parseInt(request.params.id);
    const inputDate = request.params.date;
    pool.query('SELECT * FROM meal WHERE user_id = $1 AND meal_time < $2', [id, inputDate], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUsersMealsByFutureDate = (request, response) => {
    const id = parseInt(request.params.id);
    const inputDate = request.params.date;
    pool.query('SELECT * FROM meal WHERE user_id = $1 AND meal_time >= $2', [id, inputDate], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUsersMealsByMealType = (request, response) => {
    const id = parseInt(request.params.id);
    const mealType = request.params.type;
    pool.query('SELECT * FROM meal WHERE user_id = $1 AND meal_type = $2', [id, mealType], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUsersMealsByCalories = (request, response) => {
    const id = parseInt(request.params.id);
    const calories = request.params.calories;
    pool.query('SELECT * FROM meal WHERE user_id = $1 AND meal_calories <= $2', [id, calories], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
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
    getAllUsers,
    getUserById,
    deleteUserById,

    getUserMealsByUserId,
    getUsersMealsByPastDate,
    getUsersMealsByFutureDate,
    getUsersMealsByMealType,
    getUsersMealsByCalories,

    getIngredientsByMealId,

    getFavMealsById,
    addFavMeal,
    deleteFavMeal
}