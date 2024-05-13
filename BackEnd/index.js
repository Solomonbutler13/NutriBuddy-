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
app.get('/users/all', db.getAllUsers);
// This gets one user
app.get('/users/:id', db.getUserById);
// This deletes the user from the database
app.delete('/users/del/:id', db.deleteUserById);
// This updates user personal info in database
app.put('/users/updatepersonal/:id', db.updateUserPersonalById);
// This updates user allergy ino in database
app.put('/users/updateallergies/:id', db.updateUserAllergiesById);
// This allows users to add user
app.post('/users/add', db.addUser);

// This gets the all the meals for a user through user id
app.get('/usermeals/:id', db.getUserMealsByUserId)
// This gets all the meals for a user past inputted date
app.get('/usermeals/pastdate/:id/:date', db.getUsersMealsByPastDate)
// This gets all the meals for a user currently or greater than inputted date
app.get('/usermeals/currdate/:id/:date', db.getUsersMealsByFutureDate)
// This gets all the meals for a user through meal type (Lunch or Dinner)
app.get('/usermeals/mealtype/:id/:type', db.getUsersMealsByMealType)
// This gets all the meals for a user through calories
app.get('/usermeals/calories/:id/:calories', db.getUsersMealsByCalories)
// This allows users to add user meal
app.post('/usermeals/add', db.addUserMeal);
// This allows users to del user meal
app.delete('/usermeals/del/:id', db.deleteUserMealById);

// This allows users to get the ingredients for a meal
app.get('/mealingredients/:id', db.getIngredientsByMealId);
// This allows devs to add ingredients for a meal
app.post('/mealingredients/add', db.addIngredients);

// This gets the users favorite meal
app.get('/favoritemeals/:id', db.getFavMealsById);
// This allows users to add favorite meal
app.post('/favoritemeals/add', db.addFavMeal);
// This allows users to delete favorite meals
app.delete('/favoritemeals/del/:id', db.deleteFavMeal);



// Start server with listen on specified port
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})