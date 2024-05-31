const { request, response } = require('express')

const Pool = require('pg').Pool

const pool = new Pool({
    user: 'adam',
    host: 'localhost',
    database: 'nutribuddy',
    password: 'password',
    port: 5432,
})

// Import express module
const express = require('express');
// Create express application
const app = express();
// Import queries file
const db1 = require('./queries/usersQueries.js');
const db2 = require('./queries/mealsQueries.js');
const db3 = require('./queries/ingredientsQueries.js');
const db4 = require('./queries/favoriteQueries.js');
// Specify route num
const port = 3000;

const cors = require('cors');

// Add middleware
app.use(express.json());
app.use(cors());

pool.connect((error) => {
    if (error) {
        console.error("error connecting to db", error);
    }else {
        console.log("connected to db");
    }
});

// Route is '/' and Returns JSON response
app.get('/', (request, response) => {
    response.json({ info: 'Connected to Nutribuddy Database'})
})

// This gets all the user in the data base
app.get('/users/all', db1.getAllUsers);
// This gets one user
app.get('/users/:id', db1.getUserById);
// This deletes the user from the database
app.delete('/users/del/:id', db1.deleteUserById);
// This updates user personal info in database
app.put('/users/updatepersonal/:id', db1.updateUserPersonalById);
// This updates user allergy ino in database
app.put('/users/updateallergies/:id', db1.updateUserAllergiesById);
// This allows users to add user
app.post('/users/add', db1.addUser);

// This gets the all the meals for a user through user id
app.get('/usermeals/:id', db2.getUserMealsByUserId)
// This gets all the meals for a user past inputted date
app.get('/usermeals/pastdate/:id/:date', db2.getUsersMealsByPastDate)
// This gets all the meals for a user currently or greater than inputted date
app.get('/usermeals/currdate/:id/:date', db2.getUsersMealsByFutureDate)
// This gets all the meals for a user through meal type (Lunch or Dinner)
app.get('/usermeals/mealtype/:id/:type', db2.getUsersMealsByMealType)
// This gets all the meals for a user through calories
app.get('/usermeals/calories/:id/:calories', db2.getUsersMealsByCalories)
// This allows users to add user meal
app.post('/usermeals/add', db2.addUserMeal);
// This allows users to del user meal
app.delete('/usermeals/del/:id', db2.deleteUserMealById);
// This gets user calorie through 
app.get('/usermeals/totalcal/:id/:date', db2.getUserDayCalorieTotal);

// This allows users to get the ingredients for a meal
app.get('/mealingredients/:id', db3.getIngredientsByMealId);
// This allows devs to add ingredients for a meal
app.post('/mealingredients/add/:id', db3.addIngredients);

// This gets the users favorite meal
app.get('/favoritemeals/:id', db4.getFavMealsById);
// This allows users to add favorite meal
app.post('/favoritemeals/add', db4.addFavMeal);
// This allows users to delete favorite meals
app.delete('/favoritemeals/del/:id', db4.deleteFavMeal);



// Start server with listen on specified port
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})