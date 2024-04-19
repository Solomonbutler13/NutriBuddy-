import React, { useState } from 'react';
import MealCard from './mealCard.jsx';
import WeeklyPlan from './WeeklyPlan.jsx';
import './mealPlanPanel.css'; // You would need to create this CSS file to style your components.

const MealPlanPanel = ({ meals }) => {
  const [favorites, setFavorites] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);

  const handleAddToFavorites = (meal) => {
    setFavorites(prev => [...prev, meal]);
  };

  const handleAddToWeeklyPlan = (meal) => {
    setWeeklyPlan(prev => [...prev, meal]);
  };
  console.log('meals: ', meals);

  return (
    <div className="meal-plan-panel">
      <div className="meal-suggestions">
        <h2>Meal Suggestions</h2>
        {meals.map((meal) => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            onAddToFavorites={handleAddToFavorites} 
            onAddToWeeklyPlan={handleAddToWeeklyPlan} 
          />
        ))}
      </div>
      <WeeklyPlan meals={weeklyPlan} />
    </div>
  );
};

export default MealPlanPanel;