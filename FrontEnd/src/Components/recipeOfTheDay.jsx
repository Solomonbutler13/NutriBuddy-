import React, { useState, useEffect } from 'react';
import './RecipeOfTheDay.css'; // Import the CSS file

function CulturalRecipeOfTheDay() {
    const [recipe, setRecipe] = useState(null);
    const [expandDescription, setExpandDescription] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            const responseCanadian = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
            const responseFrench = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=French');
            const responseIndian = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');

            const dataCanadian = await responseCanadian.json();
            const dataFrench = await responseFrench.json();
            const dataIndian = await responseIndian.json();
            // Get more data if needed...

            // Combine data from different countries
            const allRecipes = [
                ...dataCanadian.meals,
                ...dataFrench.meals,
                ...dataIndian.meals,
                // Combine recipes from more countries if needed...
            ];

            // Randomly select a recipe
            const randomIndex = Math.floor(Math.random() * allRecipes.length);
            const selectedRecipe = allRecipes[randomIndex];

            // Fetch instructions for the selected recipe
            const instructionsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedRecipe.idMeal}`);
            const instructionsData = await instructionsResponse.json();
            const recipeWithInstructions = instructionsData.meals[0];

            setRecipe(recipeWithInstructions);
        };

        fetchRecipes();
    }, []);

    const handleToggleDescription = () => {
        setExpandDescription(!expandDescription);
    };

    return (
        <div className="recipe-of-the-day">
            <h2 className="recipe-title">Cultural Recipe of The Day</h2>
            {recipe && (
                <div className="recipe-info">
                    <img className="recipe-image" src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <div className="recipe-details">
                        <h3 className="recipe-name">{recipe.strMeal}</h3>
                        <p className="recipe-description" onClick={handleToggleDescription}>
                            {expandDescription ? recipe.strInstructions : `${recipe.strInstructions.substring(0, 100)}...`}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CulturalRecipeOfTheDay;
