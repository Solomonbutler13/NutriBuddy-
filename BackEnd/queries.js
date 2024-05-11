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

const getAllUserMealsByUserId = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT * FROM meal WHERE user_id = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getIngredientsByMealId = (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM ingredients WHERE recipe_id = $1`, [id], (error, results) => {
        if(error) {
            throw error;
        }
        response.status(200).json(results.rows);
    })
};

const getFavMealsById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query(`SELECT recipe_name FROM favorite_meals WHERE user_id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows)
    })
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

    getAllUserMealsByUserId,

    getIngredientsByMealId,

    getFavMealsById,
    addFavMeal,
    deleteFavMeal
}