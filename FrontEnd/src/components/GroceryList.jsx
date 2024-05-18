// GroceryList Component
// - Import necessary dependencies (React, useState, useEffect)
// - Define GroceryList component
//   - Define state for the grocery list items and total cost using useState hook
//   - Define useEffect hook to fetch initial grocery list data from backend API
//   - Define function to calculate total cost based on the items in the list
//   - Render:
//     - Grocery list title
//     - List of grocery items with quantity and estimated cost
//     - Total cost display

import { useState, useEffect } from 'react';
import './groceryList.css'; // CSS file

// Define the GroceryList component
const GroceryList = ({ weeklyMealPlan }) => {
  // State for managing grocery items and total cost
  const [items, setItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  // Stubbed mock data for testing
  const stubbedWeeklyMealPlan = [
    {
      id: 1,
      name: 'Salmon with Roasted Vegetables',
      ingredients: [
        { name: 'Salmon', quantity: 2, unit: 'lbs', costPerUnit: 10 },
        { name: 'Broccoli', quantity: 1, unit: 'lb', costPerUnit: 2 },
        { name: 'Carrots', quantity: 1, unit: 'lb', costPerUnit: 1 }
      ]
    },
    {
      id: 2,
      name: 'Turkey Chili',
      ingredients: [
        { name: 'Ground Turkey', quantity: 1, unit: 'lb', costPerUnit: 8 },
        { name: 'Tomatoes', quantity: 3, unit: 'lbs', costPerUnit: 3 },
        { name: 'Kidney Beans', quantity: 2, unit: 'cans', costPerUnit: 2 }
      ]
    }
  ];

  // UseEffect hook to initialize grocery list data
  useEffect(() => {
    // For now, use the stubbed weekly meal plan data
    if (!weeklyMealPlan) {
      setItems(stubbedWeeklyMealPlan.flatMap(recipe => recipe.ingredients));
    } else {
      // Extract ingredients from the provided weekly meal plan
      const newItems = [];
      weeklyMealPlan.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          newItems.push({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            costPerUnit: ingredient.costPerUnit
          });
        });
      });
      setItems(newItems);
    }
  }, [weeklyMealPlan]);

  // Function to calculate total cost based on the items in the list
  useEffect(() => {
    let cost = 0;
    items.forEach(item => {
      cost += item.quantity * item.costPerUnit;
    });
    // Update total cost state
    setTotalCost(cost);
  }, [items]);

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
            <span> - ${item.quantity * item.costPerUnit.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {/* Total cost display */}
      <div className="total-cost">
        <strong>Total Cost: ${totalCost.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default GroceryList;