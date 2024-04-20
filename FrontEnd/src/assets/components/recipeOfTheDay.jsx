// 1. Define a Functional Component named CulturalRecipeOfTheDay.
// 2. Inside the component:
//    a. Define state variables to hold the recipe data.
//    b. Use the useEffect hook to fetch data from the API endpoint when the component mounts.
//    c. Extract the relevant information from the API response (recipe name, image URL, etc.).
//    d. Render the recipe information on the webpage.
// 3. Fetching Data:
//    a. Use the fetch API to make a GET request to the API endpoint.
//    b. Handle the Promise returned by fetch using .then() and .catch() to handle success and error cases.
//    c. Extract the JSON data from the response.
// 4. Extracting Information:
//    a. Access the "meals" array from the API response.
//    b. Extract the recipe name (strMeal) and image URL (strMealThumb) from the first item in the array.
// 5. Rendering Component:
//    a. Render the recipe name and image inside a <div> element.
//    b. Conditionally render the data only if it is available (check if recipe state is not null).
//    c. If the recipe is available, display the name as a heading (<h2>) and the image using an <img> element.
// 6. Export the CulturalRecipeOfTheDay component as the default export.

import React, { useState, useEffect } from 'react';
import './RecipeOfTheDay.css'; // Import the CSS file

function CulturalRecipeOfTheDay() {
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Fetch data from multiple API endpoints
        const fetchRecipes = async () => {
            const responseCanadian = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
            const responseFrench = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=French');
            const responseIndian = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
            // Fetch more countries if needed...

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

    return (
        <div className="recipe-of-the-day">
            <h2 className="recipe-title">Cultural Recipe of The Day</h2>
            {recipe && (
                <div className="recipe-info">
                    <img className="recipe-image" src={recipe.strMealThumb} alt={recipe.strMeal} />
                    <div className="recipe-details">
                        <h3 className="recipe-name">{recipe.strMeal}</h3>
                        <p className="recipe-description">{recipe.strInstructions}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CulturalRecipeOfTheDay;
