/* eslint-disable react/prop-types */
import { useState } from 'react';
import './mealCard.css';

export default function MealCard({ meal, onAddToFavorites, onAddToWeeklyPlan }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleDayChange = (day) => {
    setSelectedDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const submitDays = async () => {
    const updatedMeal = {
      ...meal, // spread all existing meal properties
      days: selectedDays // add selected days to the meal object
    };

    onAddToWeeklyPlan(updatedMeal, selectedDays);

        // Prepare the data to be sent to the backend
        const ingredientData = {
          ingredients: updatedMeal.ingredients.map(ingredient => ({
            name: ingredient.ingredientName,
            amount: {
              us: {
                value: ingredient.value,
                unit: ingredient.unit
              }
            },
            price: ingredient.price
          })),
          recipe_id: meal.id // Ensure the recipe_id is included
        };
    
        // Send a POST request to the backend
        try {
          const response = await fetch(`http://localhost:3000/ingredients/${meal.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredientData)
          });
    
          if (!response.ok) {
            throw new Error('Failed to add ingredients');
          }
    
          // Handle successful response if needed
          console.log('Ingredients added successfully');
        } catch (error) {
          console.error('Error adding ingredients:', error);
        }

    // Reset the form state
    setSelectedDays([]);
    setShowDropdown(false);
  };

  const toggleExpand = () => {
    setIsExpanded(current => !current);
  };

  console.log('meal: ', meal)
  const { calories, protein, carbs, fat, title, imageUrl, ingredientName } = meal;

  return (
    <div className="meal-card-container">
      <div className="meal-card-content" onClick={toggleExpand}>
        <img className="meal-card-image" src={imageUrl} alt={title} />
        <h3 className="meal-card-title">{title}</h3>
        <div className="meal-card-macros">
        <span className="meal-card-calories">{calories} <i>Calories</i></span>
          <span>{protein}g <i>Protein</i></span>
          <span>{carbs}g <i>Carbs</i></span>
          <span>{fat}g <i>Fat</i></span>
        </div>
      </div>
      <div className="meal-card-buttons">
        <button className="button-favorite" onClick={(e) => {
          e.stopPropagation();
          addToFavorites(meal);
        }}>💟</button>
        <button className="button-weekly" onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(!showDropdown);
        }}></button>
        {showDropdown && (
          <div className="dropdown-menu">
            {daysOfWeek.map(day => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                {day}
              </label>
            ))}
            <button onClick={submitDays}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}