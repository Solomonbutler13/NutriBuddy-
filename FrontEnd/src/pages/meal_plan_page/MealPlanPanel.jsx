import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import MealCard from '../../components/MealCard';
import WeeklyPlan from '../../components/WeeklyPlan';

// import your grocery list components here
import GroceryList from '../../components/GroceryList';

// import recipe of the day component here 
import CulturalRecipeOfTheDay from '../../components/RecipeOfTheDay';

import { useStore } from "../../components/UserData.jsx";

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
  const [futureMeals, setFutureMeals] = useState([])

  const [weeklyMeals, setWeeklyMeals] = useState([
    { day: 'Sunday', meals: [] },
    { day: 'Monday', meals: [] },
    { day: 'Tuesday', meals: [] },
    { day: 'Wednesday', meals: [] },
    { day: 'Thursday', meals: [] },
    { day: 'Friday', meals: [] },
    { day: 'Saturday', meals: [] }
  ]);
const {user}= useAuth0() 


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
      const userResponse = await fetch(`http://localhost:3000/users/email`, { method:'POST', body: JSON.stringify({email:user.email})});
      if (!userResponse.ok) throw new Error('Failed to fetch user fitness information');
      const userInfo = await userResponse.json();
      const mealCalorieGoal = calculateCalorieGoal(userInfo);

      const params = {
        apiKey: import.meta.env.VITE_SPOONACULAR_KEY,
        minCalories: mealCalorieGoal - 50,
        maxCalories: mealCalorieGoal + 50,
        number: '2'  // Fetching a total of 14 meals
      };

      const data = `https://api.spoonacular.com/recipes/random?number=${params.number}&apiKey=${params.apiKey}`;
      const response = await fetch(data);
      const recipeData = await response.json();
      if (!response.ok) throw new Error(`Failed to fetch recipes ${JSON.stringify(recipeData)}`);

      const mealSuggestions = await Promise.all(recipeData.recipes.map(async (recipe) => {
        const url = `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${params.apiKey}`;
        console.log('url:', url);
        const nutritionResponse = await fetch(url);
        const nutritionData = await nutritionResponse.json();
        if (!nutritionResponse.ok) throw new Error('Failed to fetch nutrition info');
        
        const link = `https://api.spoonacular.com/recipes/${recipe.id}/priceBreakdownWidget.json?apiKey=${params.apiKey}`;
        console.log('link:', link);
        const priceResponse = await fetch(link);
        const priceData = await priceResponse.json();
        if (!priceResponse.ok) throw new Error('Failed to fetch nutrition info');

        return {
          ...recipe,
          id: recipe.id,
          calories: Math.round(nutritionData.nutrients[0].amount),
          protein: Math.round(nutritionData.nutrients[8].amount),
          carbs: Math.round(nutritionData.nutrients[3].amount),
          fat: Math.round(nutritionData.nutrients[1].amount),
          imageUrl: recipe.image,
          ingredients: priceData.ingredients.map(ingredient => ({
            ingredientName: ingredient.name,
            value: ingredient.amount.us.value,
            unit: ingredient.amount.us.unit,
            price: (ingredient.price / 100).toFixed(2)
          }))
        };
      }));

      setMealSuggestions(mealSuggestions);
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
              meal={meal} //{...meal}
              onAddToFavorites={handleAddToFavorites}
              onAddToWeeklyPlan={handleAddToWeeklyPlan}
            />
          ))}
        </div>
      </div>
      <div className="weekly-plan-section">
      <WeeklyPlan futureMeals={futureMeals} setFutureMeals={setFutureMeals} userId={userId} weeklyMeals={weeklyMeals} />
      <GroceryList weeklyMealPlan={futureMeals}  />
      </div>
      <div className="cultural-recipe">
      <CulturalRecipeOfTheDay />
      </div>
    </div>
  );
};

export default MealPlanPanel;
