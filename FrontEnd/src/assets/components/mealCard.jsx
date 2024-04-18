{/*Component MealCard
  Props: meal { title, imageUrl, description, calories }
  States: isExpanded/setIsExpanded

  Function addToFavorites
    Call POST with a mealId to update favorites
    Update UI based on response
  Function addToWeeklyPlan
    Call POST with a mealId to add meal to weekly plan
    Update UI based on response
  Function toggleExpand
    Expands recipe card when clicked
    Return to default view when clicked again 

  Display
    onClick={toggleExpand}
    Image src={imageUrl}
    Text title
    Text description
    Text "Calories: {calories}"
    Button "Favorite" onClick={addToFavorites}
    Button "Add to Plan" onClick={addToWeeklyPlan}
    Conditional rendering: full recipe description */}
  
    import { useState } from 'react';
    import './mealCard.css';

    export default function MealCard({ meal }) {
      const { title, imageUrl, description, calories } = meal;
      const [isExpanded, setIsExpanded] = useState(false);
      const [favorites, setFavorites] = useState([]);
      const [weeklyPlan, setWeeklyPlan] = useState([]);
    
      const addToFavorites = async () => {
        try {
          const response = await fetch('favoritemealsAPI', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mealId: meal.id }),
          });
          if (!response.ok) throw new Error('Failed to add to favorites');
          const newFave = await response.json(); 
          setFavorites((prevFavorites) => ([...prevFavorites, newFave]));
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      };
    
      const addToWeeklyPlan = async () => {
        try {
          const response = await fetch('weeklyMealPlanAPI', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mealId: meal.id }),
          });
        if (!response.ok) throw new Error('Failed to add to weekly plan');
          const newWeeklyMeal = await response.json();
          setWeeklyPlan((prevWeeklies) => ([...prevWeeklies, newWeeklyMeal]));
        } catch (error) {
          console.error('Error adding to weekly plan:', error);
        }
      };
    
      const toggleExpand = () => {
        setIsExpanded(current => !current);
      };
    
  return (
    <div className="meal-card-container">
      <div className="meal-card-header">
        Meal Suggestions
      </div>
      <div className="meal-card-content" onClick={toggleExpand}>
        <img className="meal-card-image" src={imageUrl} alt={title} />
        <h3 className="meal-card-title">{title}</h3>
        <p className="meal-card-description">
          {isExpanded ? description : `${description.substring(0, 100)}...`}
        </p>
        <p className="meal-card-calories">{calories} kcal</p>
      </div>
      <div className="meal-card-buttons">
        <button className="button-favorite" onClick={(e) => {
          e.stopPropagation(); 
          addToFavorites();
        }}>Favorite</button>
        <button className="button-weekly" onClick={(e) => {
          e.stopPropagation();
          addToWeeklyPlan();
        }}>Add to Plan</button>
      </div>
    </div>
  );

    }