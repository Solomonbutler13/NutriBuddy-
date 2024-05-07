
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
// import MealCardContainer from './mealCardContainer';  
import { useStore } from "./userData.jsx";

export default function MealRecommendations({ userId }) {


    // Function to calculate calorie goals based on user's fitness info


    // Fetch recipes when component mounts
    useEffect(() => {
        fetchUserFitnessInfoAndMeals();
    }, []);  // Depend on userId to re-fetch if it changes

    return (
        <div className="meal-recommendations-container">
            <h2>Recommended Meals</h2>
            {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : <MealCardContainer recipes={recipes} />}
        </div>
    );
}