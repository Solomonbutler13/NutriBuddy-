import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealCard from '../../components/MealCard';
import WeeklyPlan from '../../components/WeeklyPlan';
import GroceryList from '../../components/GroceryList';
import CulturalRecipeOfTheDay from '../../components/RecipeOfTheDay';
import './mealPlanPanel.css';

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

  const navigate = useNavigate();

  const handleAddToFavorites = (meal) => {
    setFavorites((prev) => [...prev, meal]);
  };

  const handleAddToWeeklyPlan = (meal, days) => {
    setWeeklyMeals((prevWeeklyMeals) => {
      return prevWeeklyMeals.map((dayInfo) => {
        if (days.includes(dayInfo.day)) {
          const updatedMeals = dayInfo.meals.find((m) => m.id === meal.id) ? dayInfo.meals : [...dayInfo.meals, meal];
          return { ...dayInfo, meals: updatedMeals };
        }
        return dayInfo;
      });
    });
  };

  const AboutMe = () => {
    navigate('/about'); // routes to user profile page
  };

  return (
    <div className="meal-plan-panel">
      <div className="NavBar">
        <button id="aboutme-button" type="button" onClick={AboutMe}>About Me</button>
      </div> 
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
      <div className="weekly-plan-section">
        <WeeklyPlan weeklyMeals={weeklyMeals} />
        <GroceryList />
      </div>
      <div className="cultural-recipe">
        <CulturalRecipeOfTheDay />
      </div>
    </div>
  );
};

export default MealPlanPanel;
