import React, { useState } from 'react';
import MealCard from './mealCard.jsx';
import WeeklyPlan from './WeeklyPlan.jsx';
import './MealPlanPanel.css'; 

const MealPlanPanel = ({ meals, userName = "User" }) => {
  const [favorites, setFavorites] = useState([]);

  const [weeklyMeals, setWeeklyMeals] = useState([
    { day: 'Sunday', meals: [] },
    { day: 'Monday', meals: [] },
    { day: 'Tuesday', meals: [] },
    { day: 'Wednesday', meals: [] },
    { day: 'Thursday', meals: [] },
    { day: 'Friday', meals: [] },
    { day: 'Saturday', meals: [] }
  ]);

  const handleAddToFavorites = (meal) => {
    setFavorites(prev => [...prev, meal]);
  };

  const handleAddToWeeklyPlan = (meal, days) => {
    setWeeklyMeals(prevWeeklyMeals => {
      return prevWeeklyMeals.map(dayInfo => {
        if (days.includes(dayInfo.day)) {
          const updatedMeals = dayInfo.meals.find(m => m.id === meal.id) ? dayInfo.meals : [...dayInfo.meals, meal];
          return { ...dayInfo, meals: updatedMeals };
        }
        return dayInfo;
      });
    });
  };

  return (
    <div className="meal-plan-panel">
      <h1 style={{ width: '100%', textAlign: 'center' }}>{userName}'s Meal Plan</h1> 
      <div className="meal-suggestions">
        <h2 className="meal-suggestions-title">Meal Suggestions</h2>
        <div className="meal-suggestions-scrollable">
          {meals.map((meal) => (
            <MealCard 
              key={meal.id} 
              meal={meal} 
              onAddToFavorites={handleAddToFavorites} 
              onAddToWeeklyPlan={handleAddToWeeklyPlan} 
            />
          ))}
        </div>
      </div>
      <WeeklyPlan weeklyMeals={weeklyMeals} />
    </div>
  );
};

export default MealPlanPanel;