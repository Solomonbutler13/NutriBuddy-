const { request, response } = require('express')

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'adam',
    host: 'localhost',
    database: 'nutribuddy',
    password: 'password',
    port: 5432,
})

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

const addUserMeal = (request, response) => {
    try {
        const {
            recipe_id,
            recipe_link,
            user_id,
            meal_name,
            meal_time,
            meal_type,
            meal_calories
        } = request.body;
        pool.query(
            `INSERT INTO meal (recipe_id, recipe_link, user_id, meal_name, meal_time, meal_type, meal_calories)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [recipe_id, recipe_link, user_id, meal_name, meal_time, meal_type, meal_calories],
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

const deleteUserMealById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`DELETE FROM meal WHERE id = ${id}`, (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserDayCalorieTotal = (request, response) => {
    const id = parseInt(request.params.id);
    const date = request.params.date;
    pool.query('SELECT * FROM meal WHERE user_id = $1 AND meal_time <= $2', [id, date], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}



module.exports = {
    getUserMealsByUserId,
    getUsersMealsByPastDate,
    getUsersMealsByFutureDate,
    getUsersMealsByMealType,
    getUsersMealsByCalories,
    addUserMeal,
    deleteUserMealById,
    getUserDayCalorieTotal
}