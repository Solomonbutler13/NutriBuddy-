import { useEffect, useState } from "react";
import "./weeklyPlan.css";

const WeeklyPlan = ({ userId, weeklyMeals }) => {
  const [mealsByDay, setMealsByDay] = useState(weeklyMeals);

  useEffect(() => {
    setTimeout(() => {
      fetchMealsForWeek();
    }, [500]);
  }, [userId, weeklyMeals]);

  const fetchMealsForWeek = async () => {
    // const today = new Date();
    // const nextWeek = new Date();
    // nextWeek.setDate(today.getDate() + 7);

    // const startDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    // const endDate = nextWeek.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    const today = new Date();

    // Find the start date (most recent Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    // Find the end date (next Saturday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startDate = startOfWeek.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const endDate = endOfWeek.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    console.log("star", startDate, endDate);

    try {
      // Fetch past meals (up to today)
      const pastResponse = await fetch(
        `http://localhost:3000/usermeals/pastdate/${userId}/${startDate}`
      );

      if (!pastResponse.ok) {
        throw new Error("Failed to fetch past meals");
      }
      const pastMeals = await pastResponse.json();
      console.log("past meals json", pastMeals);

      // Fetch future meals (from today onwards)
      const futureResponse = await fetch(
        `http://localhost:3000/usermeals/currdate/${userId}/${endDate}`
      );
      if (!futureResponse.ok) {
        throw new Error("Failed to fetch future meals");
      }
      const futureMeals = await futureResponse.json();
      console.log("futuremeals:", futureMeals);

      // Combine past and future meals
      const allMeals = [...pastMeals, ...futureMeals];
      setMealsByDay(organizeMealsByDay(allMeals));
      console.log("state:", organizeMealsByDay(allMeals));
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const organizeMealsByDay = (meals) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek.map((day) => ({
      day,
      meals: meals.filter((meal) => {
        const mealDate = new Date(meal.meal_time);
        return mealDate.getDay() === daysOfWeek.indexOf(day);
      }),
    }));
  };

  console.log("mealsByDay", mealsByDay);

  const deleteMeal = async (meal) => {
    try {
      const pastResponse = await fetch(
        `http://localhost:3000/usermeals/del/${meal.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!pastResponse.ok) {
        throw new Error("Failed to delete the meal");
      }

      console.log("Meal deleted");
      fetchMealsForWeek();
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  return (
    <div className="weekly-plan-panel">
      <div className="weekly-plan-title">Weekly Plan</div>
      {mealsByDay.map(({ day, meals }) => (
        <div key={day} className="day-container">
          <span className="icon-sun">☀️</span>
          <div className="day-name">{day}</div>
          <div className="day-meals">
            {meals.map((meal, index) => (
              <div key={index} className="meal-item">
                {meal.meal_name}
                <button onClick={() => deleteMeal(meal)}>X</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlan;
