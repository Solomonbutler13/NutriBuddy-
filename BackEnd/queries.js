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

const updateUserPersonalById = (request, response) => {
    let { id, first_name, last_name, age, email, curr_weight, goal_weight, height, calorie_goal} = request.body;
    let myPromise = new Promise(function(resolve, reject){
        pool.query(`SELECT * FROM users WHERE id=$1`, [id], (error, results) => {
            if (error){
                throw error;
            } else if(response){
                first_name = first_name !== undefined ? first_name : results.rows.first_name;
                last_name = last_name !== undefined ? last_name : results.rows.last_name;
                age = age !== undefined ? age : results.rows.age;
                email = email !== undefined ? email : results.rows.email;
                curr_weight = curr_weight !== undefined ? curr_weight : results.rows.curr_weight;
                goal_weight = goal_weight !== undefined ? goal_weight : results.rows.goal_weight;
                height = height !== undefined ? height : results.rows.height;
                calorie_goal = calorie_goal !== undefined ? calorie_goal : results.rows.calorie_goal;
                resolve(results.rows)
                return results.rows
            }else {
                reject()
            }
        })
    })

    myPromise.then(() => {
        try {
            pool.query(
                `UPDATE users
                    SET first_name=$1, last_name=$2, age=$3, email=$4,
                    curr_weight=$5, goal_weight=$6, height=$7, calorie_goal=$8`,
                [first_name, last_name, age, email, curr_weight, goal_weight, height, calorie_goal],
                (error, results) => {
                    if (error) {
                        console.log(error, '<--- error here')
                        throw error;
                    }
                    console.log(results, "<--- results")
                    response.status(200).json(results.rows)
                }
            );
        }catch (error) {
            throw error;
        }
    })
};

const updateUserAllergiesById = (request, response) => {
    let { id, fish, soy, milk, shellfish, nuts, eggs, wheat, sesame} = request.body;
    let myPromise = new Promise(function(resolve, reject){
        pool.query(`SELECT * FROM users WHERE id=$1`, [id], (error, results) => {
            if (error){
                throw error;
            } else if(response){
                fish = fish !== undefined ? fish : results.rows.fish;
                soy = soy !== undefined ? soy : results.rows.soy;
                milk = milk !== undefined ? milk : results.rows.milk;
                shellfish = shellfish !== undefined ? shellfish : results.rows.shellfish;
                nuts = nuts !== undefined ? nuts : results.rows.nuts;
                eggs = eggs !== undefined ? eggs : results.rows.eggs;
                wheat = wheat !== undefined ? wheat : results.rows.wheat;
                sesame = sesame !== undefined ? sesame : results.rows.sesame;
                resolve(results.rows)
                return results.rows
            }else {
                reject()
            }
        })
    })

    myPromise.then(() => {
        try {
            pool.query(
                `UPDATE users
                    SET fish=$1, soy=$2, milk=$3, shellfish=$4,
                    nuts=$5, eggs=$6, wheat=$7, sesame=$8`,
                [fish, soy, milk, shellfish, nuts, eggs, wheat, sesame],
                (error, results) => {
                    if (error) {
                        console.log(error, '<--- error here')
                        throw error;
                    }
                    console.log(results, "<--- results")
                    response.status(200).json(results.rows)
                }
            );
        }catch (error) {
            throw error;
        }
    })
};

const addUser = (request, response) => {
    try {
        const {
            first_name,
            last_name,
            age,
            email,
            curr_weight,
            goal_weight,
            height,
            calorie_goal,
            fish,
            soy,
            milk,
            shellfish,
            nuts,
            eggs,
            wheat,
            sesame
        } = request.body;
        pool.query(
            `INSERT INTO users (first_name, last_name, age, email, curr_weight, goal_weight,
            height, calorie_goal, fish, soy, milk, shellfish, nuts, eggs, wheat, sesame) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
            [first_name, last_name, age, email, curr_weight, goal_weight, height, calorie_goal,
            fish, soy, milk, shellfish, nuts, eggs, wheat, sesame],
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
            user_id,
            meal_name,
            meal_time,
            meal_type,
            meal_calories
        } = request.body;
        pool.query(
            `INSERT INTO meal (recipe_id, user_id, meal_name, meal_time, meal_type, meal_calories)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [recipe_id, user_id, meal_name, meal_time, meal_type, meal_calories],
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
        const {
            recipe_id,
            ingredient_name,
            quantity,
            unit_type,
            price_per_unit
        } = request.body;
        pool.query(
            `INSERT INTO ingredients (recipe_id, ingredient_name, quantity, unit_type, price_per_unit)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [recipe_id, ingredient_name, quantity, unit_type, price_per_unit],
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
    updateUserPersonalById,
    updateUserAllergiesById,
    addUser,

    getUserMealsByUserId,
    getUsersMealsByPastDate,
    getUsersMealsByFutureDate,
    getUsersMealsByMealType,
    getUsersMealsByCalories,
    addUserMeal,
    deleteUserMealById,

    getIngredientsByMealId,
    addIngredients,

    getFavMealsById,
    addFavMeal,
    deleteFavMeal
}