// Import express module
const express = require('express');
// Create express application
const app = express();
// Import queries file
const db = require('./queries.js');
// Specify route num
const port = 3000;

const cors = require('cors');

// Add middleware
app.use(express.json());
app.use(cors());

// Route is '/' and Returns JSON response
app.get('/', (request, response) => {
    response.json({ info: 'Connected to Nutribuddy Database'})
})

// This gets all the user in the data base
app.get('/allusers', db.getAllUsers);
// This gets one user
app.get('/user/:id', db.getUserById);
// This deletes the user from the database
app.delete('/deluser/:id', db.deleteUserById);

// This gets the meals for a user
app.get('/usermeals/:id', db.getAllUserMealsByUserId)

// This allows users to get the ingredients for a meal
app.get('/mealingredients/:id', db.getIngredientsByMealId);

// This gets the users favorite meal
app.get('/favoritemeals/:id', db.getFavMealsById);
// This allows users to add favorite meal
app.post('/addfavoritemeal/', db.addFavMeal);
// This allows users to delete favorite meals
app.delete('/delfavoritemeal/:id', db.deleteFavMeal);



// Start server with listen on specified port
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})