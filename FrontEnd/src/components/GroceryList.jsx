import { useState, useEffect } from 'react';
import './groceryList.css'; // Import the CSS file for styling

// Define the GroceryList component
const GroceryList = ({ weeklyMealPlan }) => {
  // State for managing grocery items and total cost
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // UseEffect hook to fetch grocery list data from backend API
  useEffect(() => {
    // Function to fetch ingredients for each meal in the weeklyMealPlan
    const fetchIngredients = async () => {
      try {
        const fetchedItems = [];

        // Loop through each meal in the weeklyMealPlan
        for (let meal of weeklyMealPlan) {
          console.log('meal: ', meal);
          // Make a GET request to fetch ingredients for the current meal ID
          const url = `http://localhost:3000/mealingredients/${meal.recipe_id}`
          console.log('ingredients url: ', url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('meal ingredients: ', data);

          // Assuming the response contains an array of ingredients
          data.forEach(ingredient => {
            fetchedItems.push({
              name: ingredient.ingredient_name, // Ingredient name
              quantity: ingredient.quantity,    // Quantity of the ingredient
              unit: ingredient.unit_type,       // Unit type of the quantity (e.g., grams, liters)
              costPerUnit: ingredient.price_per_unit // Price per unit of the ingredient
            });
          });
        }

        // Update the state with the fetched ingredients
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    // Call the fetchIngredients function
    fetchIngredients();
  }, [weeklyMealPlan]); // Dependency array: the effect will re-run when weeklyMealPlan changes

  // UseEffect hook to calculate total cost based on the items in the list
  useEffect(() => {
    let cost = 0;

    // Calculate total cost by summing up the cost of each item
    items.forEach(item => {
      cost += item.quantity * item.costPerUnit;
    });

    // Update total cost state
    setTotalCost(cost);
  }, [items]); // Dependency array: the effect will re-run when items changes

  return (
    <div className="grocery-list">
      {/* Grocery list title */}
      <h2>Grocery List</h2>
      {/* List of grocery items */}
      <ul className="grocery-items">
        {items.map((item, index) => {
          console.log('item name length: ', item.name.length);
          for (let ingredientNumber = 0; ingredientNumber < item.name.length; ingredientNumber++) {
              console.log(ingredientNumber);
            return (
              <li key={index} className="grocery-item">
                {/* Display each grocery item with quantity and cost */}
                {item.name[ingredientNumber]} - {item.quantity[ingredientNumber]} {item.unit[ingredientNumber]}
                <span> - ${item.quantity[ingredientNumber] * parseInt(item.costPerUnit[ingredientNumber]).toFixed(2)}</span>
              </li>

            )
          }
        })}
      </ul>
      {/* Total cost display */}
      <div className="total-cost">
        <strong>Total Cost: ${parseInt(totalCost).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default GroceryList;



// Explanation
// Fetching Ingredients:

// The fetchIngredients function fetches ingredients for each meal ID present in the weeklyMealPlan.
// It makes a GET request to the backend endpoint for each meal ID and accumulates the fetched ingredients in the fetchedItems array.
// The state items is then updated with the fetched ingredients.
// Calculating Total Cost:

// The second useEffect hook calculates the total cost of the ingredients whenever the items state changes.
// Rendering:

// The component renders the grocery list with the fetched ingredients and their total cost.