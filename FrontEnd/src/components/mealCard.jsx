import { useState } from "react";
import "./mealCard.css";

export default function MealCard({
  meal,
  onAddToFavorites,
  onAddToWeeklyPlan,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleDayChange = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addMealToFavourite = async () => {
    const userId = 1; //stubbed
    const mealData = {
      recipe_id: meal.recipe_id,
      user_id: userId,
      recipe_name: meal.title,
    };

    try {
      const response = await fetch(`http://localhost:3000/favoritemeals/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      });

      if (!response.ok) {
        throw new Error("Failed to add meal");
      }

      alert(`${meal?.title} Added to Favorites!`);

      console.log("Meal added successfully");
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const submitDays = async () => {
    const userId = 1; //stubbed

    // Iterate over each selected day
    selectedDays.forEach(async (day) => {
      // Calculate the next occurrence of the selected day
      const today = new Date();
      const dayIndex = daysOfWeek.indexOf(day);
      const diff = (dayIndex - today.getDay() + 7) % 7;
      const mealTime = new Date(today.setDate(today.getDate() + diff));

      // Prepare meal data with specific date for the selected day
      const mealData = {
        recipe_id: meal.id,
        recipe_link: meal.recipe_link,
        user_id: userId,
        meal_name: meal.title,
        meal_time: mealTime.toISOString(), // Use the specific date for the selected day
        meal_calories: meal.calories,
      };

      // Send a POST request to the backend to add the meal
      try {
        const response = await fetch(`http://localhost:3000/usermeals/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mealData),
        });

        if (!response.ok) {
          throw new Error("Failed to add meal");
        } else {
          console.log("Meal added successfully");
        }
      } catch (error) {
        console.error("Error adding meal:", error);
      }
    });

    onAddToWeeklyPlan(meal, selectedDays);

    // Prepare the data to be sent to the backend
    const ingredientData = {
      ingredients: meal.ingredients.map((ingredient) => ({
        name: ingredient.ingredientName,
        amount: {
          us: {
            value: ingredient.value,
            unit: ingredient.unit,
          },
        },
        price: ingredient.price,
      })),
      recipe_id: meal.id, // Ensure the recipe_id is included
    };

    console.log(JSON.stringify(ingredientData));

    // Send a POST request to the backend
    try {
      const response = await fetch(
        `http://localhost:3000/mealingredients/add/${meal.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ingredientData),
        }
      );

      console.log("response--- ingredients", response);

      if (!response.ok) {
        throw new Error("Failed to add ingredients");
      }

      // Handle successful response if needed
      console.log("Ingredients added successfully");
    } catch (error) {
      console.error("Error adding ingredients:", error);
    }

    // Reset the form state
    setSelectedDays([]);
    setShowDropdown(false);
  };

  const toggleExpand = () => {
    setIsExpanded((current) => !current);
  };

  const { calories, protein, carbs, fat, title, imageUrl, ingredientName } =
    meal;

  return (
    <div className="meal-card-container">
      <div className="meal-card-content" onClick={toggleExpand}>
        <img className="meal-card-image" src={imageUrl} alt={title} />
        <h3 className="meal-card-title">{title}</h3>
        <div className="meal-card-macros">
          <span className="meal-card-calories">
            {calories} <i>Calories</i>
          </span>
          <span>
            {protein}g <i>Protein</i>
          </span>
          <span>
            {carbs}g <i>Carbs</i>
          </span>
          <span>
            {fat}g <i>Fat</i>
          </span>
        </div>
      </div>
      <div className="meal-card-buttons">
        <button
          className="button-favorite"
          onClick={(e) => {
            e.stopPropagation();
            addMealToFavourite(meal);
          }}
        >
          💟
        </button>
        <button
          className="button-weekly"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        ></button>
        {showDropdown && (
          <div className="dropdown-menu">
            {daysOfWeek.map((day) => (
              <label key={day}>
                <input
                  type="checkbox"
                  checked={selectedDays.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                {day}
              </label>
            ))}
            <button onClick={submitDays}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
