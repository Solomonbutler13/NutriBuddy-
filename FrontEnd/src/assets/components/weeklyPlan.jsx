{/*Component: WeeklyPlanPanel
Props: meals (array of strings, each representing a meal)
States:
    - weeklyMeals (array, initialized with meals sorted into days)
    - currentDragMeal (null initially, set when a meal is dragged)

Functions:
    - handleDragStart(meal, event):
        1. Set currentDragMeal to the meal being dragged.
        2. Use event.dataTransfer.setData('text/plain', meal) to facilitate the drag.

    - handleDrop(day, event):
        1. Prevent default action to allow drop.
        2. Retrieve the meal data from event.dataTransfer.getData('text/plain').
        3. Update the weeklyMeals array to include the meal under the specified day.
        4. Set currentDragMeal to null after completion.
        5. Call POST '/api/weekly-plan/add' with day and meal to update the server.

    - handleDragOver(event):
        1. Prevent default action to allow for drop (event.preventDefault()).

Display:
    - Loop through each day of the week:
        - Create a container for each day that can receive drop events:
            - onDrop={(event) => handleDrop(day, event)}
            - onDragOver={handleDragOver}
        - Display meals for that day:
            - Each meal is wrapped in a <div> that is draggable:
                - draggable="true"
                - onDragStart={(event) => handleDragStart(meal, event)}
                - Display text of meal */}

import { useState } from 'react';
import './weeklyPlan.css';

const WeeklyPlan = ({ meals }) => {
  const [weeklyMeals, setWeeklyMeals] = useState([
    { day: 'Sunday', meals: [] },
    { day: 'Monday', meals: [] },
    { day: 'Tuesday', meals: [] },
    { day: 'Wednesday', meals: [] },
    { day: 'Thursday', meals: [] },
    { day: 'Friday', meals: [] },
    { day: 'Saturday', meals: [] }
  ]);
  const [currentDragMeal, setCurrentDragMeal] = useState(null);

  const handleDragStart = (meal, event) => {
    setCurrentDragMeal(meal);
    event.dataTransfer.setData('text/plain', meal);
  };

  const handleDrop = (day, event) => {
    event.preventDefault();
    const meal = event.dataTransfer.getData('text/plain');
    const updatedWeeklyMeals = weeklyMeals.map(weeklyMeal => {
      if (weeklyMeal.day === day) {
        return { ...weeklyMeal, meals: [...weeklyMeal.meals, meal] };
      }
      return weeklyMeal;
    });
    setWeeklyMeals(updatedWeeklyMeals);
    setCurrentDragMeal(null);
    // Call POST '/api/weekly-plan/add' with day and meal to update the server
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="weekly-plan-panel">
      <div className="weekly-plan-title">Weekly Plan</div>
      {weeklyMeals.map(({ day, meals }) => (
        <div
          key={day}
          className="day-container"
          onDrop={(event) => handleDrop(day, event)}
          onDragOver={handleDragOver}
        >
          <span className="icon-sun">☀️</span>
          <div className="day-name">{day}</div>
          <div className="day-meals">
            {meals.map(meal => (
              <div
                key={meal}
                className="meal-item"
                draggable="true"
                onDragStart={(event) => handleDragStart(meal, event)}
              >
                {meal}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlan;