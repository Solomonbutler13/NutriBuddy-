import { useState, useEffect } from 'react';
import MealCard from '../../components/mealCard.jsx';
import WeeklyPlan from '../../components/weeklyPlan.jsx';
import { useStore } from "../../components/userData.jsx";
import './mealPlanPanel.css';

const MealPlanPanel = ({ meals, userName = "User" }) => {
  const { userId, age, height, curr_weight, goal_weight, gender, activity_level } = useStore(state => ({
    userId: state.userId,
    age: state.age,
    height: state.height,
    curr_weight: state.weight,
    goal_weight: state.goalWeight,
    gender: state.gender,
    activity_level: state.activityLevel
  }));
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mealSuggestions, setMealSuggestions] = useState(meals);

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

  function calculateCalorieGoal(userInfo) {
    let bmr;
    if (gender === 'female') {
        bmr = 10 * curr_weight + 6.25 * height - 5 * age - 161;
    } else {
        bmr = 10 * curr_weight + 6.25 * height - 5 * age + 5;
    }

    const activityMultipliers = {
        'sedentary': 1.2,
        'lightly_active': 1.375,
        'moderately_active': 1.55,
        'very_active': 1.725,
        'extra_active': 1.9
    };

    const tdee = bmr * (activityMultipliers[activity_level] || 1.55);
    return Math.round(tdee * 0.4);  // Assuming 40% of calories for each major meal
}



  const fetchUserFitnessInfoAndMeals = async () => {
    setIsLoading(true);
    try {
        const userResponse = await fetch(`http://localhost:3000/user/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user fitness information');
        const userInfo = await userResponse.json();
        console.log('User info from meal recommendations: ', userInfo)
        const mealCalorieGoal = calculateCalorieGoal(userInfo);

        const params = new URLSearchParams({
            type: 'public',
            q: 'healthy',
            app_id: 'bd8c592a',
            app_key: 'e17e5ba0a3a6948de1cae377bdcb2196',
            calories: `${mealCalorieGoal - 50}-${mealCalorieGoal + 50}`,
            to: '14'  // Fetching a total of 14 meals
        });

        const url = `https://api.edamam.com/api/recipes/v2?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setMealSuggestions(data.hits.map(hit => hit.recipe));
        console.log('My recipes: ', data.hits)
        setError('');
    } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to load recipes, please try again.');
    } finally {
        setIsLoading(false);
    }
};

useEffect(() => {
  fetchUserFitnessInfoAndMeals();
}, []);

  return (
    <div className="meal-plan-panel">
      <h1 style={{ width: '100%', textAlign: 'center' }}>{userName}'s Meal Plan</h1>
      <div className="meal-suggestions">
        <h2 className="meal-suggestions-title">Meal Suggestions</h2>
        <div className="meal-suggestions-scrollable">
          {mealSuggestions.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              // title=
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