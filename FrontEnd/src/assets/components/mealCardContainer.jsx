import React from 'react';
import MealCard from './MealCard.jsx';
import './mealCardContainer.css';

const MealCardContainer = ({ meals }) => {
  return (
    <div className="meal-card-container-wrapper">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default MealCardContainer;