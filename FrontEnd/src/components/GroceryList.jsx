import { useState, useEffect } from 'react';
import './groceryList.css'; // Import the CSS file for styling

// Define the GroceryList component
const GroceryList = ({ weeklyMealPlan }) => {
  // State for managing grocery items and total cost
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // UseEffect hook to fetch grocery list data from backend API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const fetchedItems = [];

        // Loop through each meal in the weeklyMealPlan
        for (let meal of weeklyMealPlan) {
          console.log('meal: ', meal);
          // Make a GET request to fetch ingredients for the current meal ID
          const url = `http://localhost:3000/mealingredients/${meal.recipe_id}`;
          console.log('ingredients url: ', url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('meal ingredients: ', data);

          // Assuming the response contains an array of ingredients
          data.forEach(ingredientList => {
            for (let i = 0; i < ingredientList.ingredient_name.length; i++) {
              fetchedItems.push({
                name: ingredientList.ingredient_name[i],
                quantity: Number(ingredientList.quantity[i]), // Ensure it's a number
                unit: ingredientList.unit_type[i],
                costPerUnit: Number(ingredientList.price_per_unit[i]) // Ensure it's a number
              });
            }
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
        {items.map((item, index) => (
          <li key={index} className="grocery-item">
            {/* Display each grocery item with quantity and cost */}
            {item.name} - {item.quantity} {item.unit}
            <span> - ${parseFloat(item.quantity * item.costPerUnit).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {/* Total cost display */}
      <div className="total-cost">
        <strong>Total Cost: ${parseFloat(totalCost).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default GroceryList;