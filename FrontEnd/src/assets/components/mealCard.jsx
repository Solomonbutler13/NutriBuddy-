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