import React from 'react';
import './weeklyPlan.css';

const WeeklyPlan = ({ weeklyMeals }) => {
  return (
    <div className="weekly-plan-panel">
      <div className="weekly-plan-title">Weekly Plan</div>
      {weeklyMeals.map(({ day, meals }) => (
        <div key={day} className="day-container">
          <span className="icon-sun">☀️</span>
          <div className="day-name">{day}</div>
          <div className="day-meals">
            {meals.map((meal, index) => (
              <div key={index} className="meal-item">
                {meal.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlanPanel;