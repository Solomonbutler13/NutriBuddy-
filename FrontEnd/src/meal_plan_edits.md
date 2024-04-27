```plaintext
/* Original GroceryList Component CSS */

/* Styling for the grocery list container */
.grocery-list {
    background-color: #fdf3f3; /* Set background color */
    border: 1px solid black; /* Add border */
    border-radius: 8px; /* Add border radius for rounded corners */
    padding: 20px; /* Add padding inside the container */
    width: 45%; /* Set width of the container */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add box shadow for depth effect */
    overflow-y: auto; /* Enable vertical scrollbar when content exceeds container height */
    position: relative; /* Set position relative for absolute positioning of child elements */
    margin-left: auto; /* Align to the right side of the container */
  }
  
  /* Styling for the grocery list title */
  .grocery-list h2 {
    margin-top: 0; /* Remove top margin */
    font-size: 24px; /* Set font size */
    color: black; /* Set text color */
    margin-bottom: 10px; /* Add bottom margin */
  }
  
  /* Styling for the list of grocery items */
  .grocery-items {
    list-style-type: none; /* Remove bullet points */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
  }
  
  /* Styling for each grocery item */
  .grocery-item {
    font-size: 16px; /* Set font size */
    color: black; /* Set text color */
  }
  
  /* Styling for the cost of each grocery item */
  .grocery-item span {
    color: black; /* Set text color */
  }
  
  /* Styling for the total cost display */
  .total-cost {
    margin-top: 20px; /* Add top margin */
    text-align: right; /* Align total cost to the right */
    font-size: 20px;
  }
  
  /* Styling for the total cost text */
  .total-cost strong {
    font-weight: bold; /* Set font weight */
    color: black; /* Set text color */
  }
  




  //    Meal plan page original css. It is still the original css. i just had this while i was playing around in the file but i brought it back to the original.



  .meal-plan-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 100%; 
  background-color: #D9D9D9;
  font-family: 'Kodchasan', sans-serif;
  padding: 30px; 
}

.meal-suggestions {
  background-color: #d8bcbc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 20px; 
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
}

.weekly-plan-panel {
  width: 80%; 
  background-color: #d8bcbc; 
  padding: 20px;
  margin: 20px; 
}

.meal-suggestions-title { 
  text-align: left; 
  font-size: 24px;
  margin-bottom: 20px;
}

.meal-suggestions-scrollable {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  gap: 20px;
  scrollbar-width: none;
}

.meal-suggestions-scrollable::-webkit-scrollbar {
  display: none;
}

.meal-card-container {
  min-width: 300px;
  flex-shrink: 0; 
}

.day-container {
  display: flex;
  align-items: center; 
  padding: 10px;
  border: 1px solid #ccc; 
  margin-bottom: 10px; 
}

.meal-item {
  background-color: #FFE8E8;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer; 
}

.icon-sun {
  color: #FFA500; 
  margin-right: 10px;
}

@media (max-width: 768px) {
  .meal-plan-panel, .meal-suggestions, .weekly-plan-panel {
    width: 100%; 
    margin: 10px 0; 
    padding: 10px; 
  }
}
```