const { request, response } = require('express')
const { pool } = require("../index")
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

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserPersonalById,
    updateUserAllergiesById,
    addUser
}