{/*Component: WeeklyPlanPanel
Props: meals (array of strings, each representing a meal)
States:
    - weeklyMeals (array, initialized with meals sorted into days)
    - currentDragMeal (null initially, set when a meal is dragged)

Functions:
    - handleDragStart(meal, event):
        1. Set currentDragMeal to the meal being dragged.
        2. Use event.dataTransfer.setData('text/plain', meal) to facilitate the drag.

    - handleDrop(day, event):
        1. Prevent default action to allow drop.
        2. Retrieve the meal data from event.dataTransfer.getData('text/plain').
        3. Update the weeklyMeals array to include the meal under the specified day.
        4. Set currentDragMeal to null after completion.
        5. Call POST '/api/weekly-plan/add' with day and meal to update the server.

    - handleDragOver(event):
        1. Prevent default action to allow for drop (event.preventDefault()).

Display:
    - Loop through each day of the week:
        - Create a container for each day that can receive drop events:
            - onDrop={(event) => handleDrop(day, event)}
            - onDragOver={handleDragOver}
        - Display meals for that day:
            - Each meal is wrapped in a <div> that is draggable:
                - draggable="true"
                - onDragStart={(event) => handleDragStart(meal, event)}
                - Display text of meal */}