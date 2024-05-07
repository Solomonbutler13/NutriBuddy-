
     {/*import { useState, useEffect } from 'react';
import MealCardContainer from './MealCardContainer.jsx';  

export default function MealRecommendations({ userId }) {
    const [recipes, setRecipes] = useState([]);
    const [nutritionGoals, setNutritionGoals] = useState({
        calories: '200-800',
        diet: 'balanced',
        health: 'peanut-free'
    });

    const fetchRecipes = async (goals) => {
        const { calories, diet, health } = goals;
        const app_id = "bd8c592a"; 
        const app_key = "e17e5ba0a3a6948de1cae377bdcb2196"; 
        const url = `https://api.edamam.com/search?q=healthy&app_id=${app_id}&app_key=${app_key}&calories=${calories}&diet=${diet}&health=${health}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch recipes');
            const data = await response.json();
            setRecipes(data.hits); // Updates the recipes state with the fetched data
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    };

    // Fetch recipes when nutrition goals are set or updated
    useEffect(() => {
        fetchRecipes(nutritionGoals);
    }, [nutritionGoals]);

    return (
        <div className="meal-recommendations-container">
            <h2>Recommended Meals</h2>
            <MealCardContainer recipes={recipes} />
        </div>
    );
}

*/}

import React, { useState, useEffect } from 'react';
import MealCardContainer from './mealCardContainer';  // Import your MealCardContainer

export default function MealRecommendations({ userId }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to calculate calorie goals based on user's fitness info
    function calculateCalorieGoal(userInfo) {
        const { age, height, curr_weight, goal_weight, gender, activity_level } = userInfo;
        const weight = goal_weight || curr_weight;

        let bmr;
        if (gender === 'female') {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
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
            const userResponse = await fetch(`https://my-backend.com/api/users/${userId}/fitness`);
            if (!userResponse.ok) throw new Error('Failed to fetch user fitness information');
            const userInfo = await userResponse.json();
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
            setRecipes(data.hits.map(hit => hit.recipe));
            setError('');
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Failed to load recipes, please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch recipes when component mounts
    useEffect(() => {
        fetchUserFitnessInfoAndMeals();
    }, [userId]);  // Depend on userId to re-fetch if it changes

    return (
        <div className="meal-recommendations-container">
            <h2>Recommended Meals</h2>
            {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : <MealCardContainer recipes={recipes} />}
        </div>
    );
}