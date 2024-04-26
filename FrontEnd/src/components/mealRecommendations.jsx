{/*Component MealRecommendations
States: recipes/setRecipes; nutritionGoals/setNutritionGoals

Function getNutritionGoals
    Call GET with a userId to retrieve user's input goals

Function fetchRecipes
    Call GET with params of nutrition goals to retrieve list of recommended recipes
    Update 

Display
    Parent container
    Container title
    .map recipes to MealCards by recipe.id

     */}
     
import { useState, useEffect } from 'react';
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