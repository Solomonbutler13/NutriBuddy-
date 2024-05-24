-- Sample data for the users table
INSERT INTO users (first_name, last_name, age, email, curr_weight, goal_weight, height, calorie_goal, fish, soy, milk, shellfish, nuts, eggs, wheat, sesame) 
VALUES 
    ('Emily', 'Johnson', 28, 'emily.johnson@example.com', 135.0, 130.0, 165, 1800, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE),
    ('Michael', 'Smith', 32, 'michael.smith@example.com', 180.0, 175.0, 175, 2000, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
    ('Ashley', 'Brown', 30, 'ashley.brown@example.com', 150.0, 145.0, 160, 1800, FALSE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE),
    ('Daniel', 'Martinez', 35, 'daniel.martinez@example.com', 170.0, 165.0, 180, 2000, TRUE, FALSE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE),
    ('Olivia', 'Jones', 27, 'olivia.jones@example.com', 140.0, 135.0, 160, 1800, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE),
    ('William', 'Davis', 29, 'william.davis@example.com', 190.0, 185.0, 180, 2200, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
    ('Sophia', 'Taylor', 31, 'sophia.taylor@example.com', 125.0, 120.0, 155, 1600, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE),
    ('Ethan', 'Anderson', 33, 'ethan.anderson@example.com', 175.0, 170.0, 178, 2000, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE),
    ('Isabella', 'Wilson', 26, 'isabella.wilson@example.com', 130.0, 125.0, 160, 1700, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE),
    ('James', 'Thomas', 34, 'james.thomas@example.com', 200.0, 195.0, 185, 2200, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE),
    ('Emma', 'Garcia', 29, 'emma.garcia@example.com', 140.0, 135.0, 162, 1800, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, FALSE),
    ('Alexander', 'Rodriguez', 31, 'alexander.rodriguez@example.com', 185.0, 180.0, 180, 2100, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
    ('Ava', 'Martinez', 28, 'ava.martinez@example.com', 135.0, 130.0, 168, 1800, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
    ('Benjamin', 'Jackson', 36, 'benjamin.jackson@example.com', 170.0, 165.0, 178, 2000, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE),
    ('Mia', 'White', 25, 'mia.white@example.com', 150.0, 145.0, 162, 1800, TRUE, FALSE, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE),
    ('Jacob', 'Harris', 30, 'jacob.harris@example.com', 180.0, 175.0, 180, 2000, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE),
    ('Charlotte', 'Clark', 28, 'charlotte.clark@example.com', 140.0, 135.0, 160, 1800, TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, TRUE),
    ('Matthew', 'Lee', 33, 'matthew.lee@example.com', 190.0, 185.0, 182, 2200, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE, FALSE),
    ('Harper', 'Taylor', 27, 'harper.taylor@example.com', 130.0, 125.0, 158, 1700, FALSE, TRUE, TRUE, FALSE, FALSE, TRUE, TRUE, FALSE),
    ('Lucas', 'Martin', 32, 'lucas.martin@example.com', 175.0, 170.0, 180, 2000, TRUE, FALSE, TRUE, TRUE, FALSE, TRUE, FALSE, TRUE);

INSERT INTO meal (recipe_id, user_id, meal_name, meal_time, meal_type, meal_calories, recipe_link) 
VALUES 
    ('rcp001', 1, 'Breakfast Burrito', '2024-05-01', 'L', 450, 'http://example.com/recipe/rcp001'),
    ('rcp001', 2, 'Breakfast Burrito', '2024-05-06', 'L', 450, 'http://example.com/recipe/rcp001'),
    ('rcp002', 2, 'Grilled Chicken', '2024-05-01', 'L', 600, 'http://example.com/recipe/rcp002'),
    ('rcp003', 2, 'Veggie Stir-fry', '2024-05-07', 'D', 400, 'http://example.com/recipe/rcp003'),
    ('rcp003', 3, 'Veggie Stir-fry', '2024-05-07', 'D', 400, 'http://example.com/recipe/rcp003'),
    ('rcp004', 4, 'Fruit Salad', '2024-05-03', 'L', 200, 'http://example.com/recipe/rcp004'),
    ('rcp005', 5, 'Salmon Fillet', '2024-05-01', 'D', 350, 'http://example.com/recipe/rcp005'),
    ('rcp006', 6, 'Quinoa Salad', '2024-05-01', 'L', 400, 'http://example.com/recipe/rcp006'),
    ('rcp007', 7, 'Chicken Caesar Salad', '2024-05-01', 'L', 500, 'http://example.com/recipe/rcp007'),
    ('rcp008', 8, 'Pasta Primavera', '2024-05-01', 'D', 550, 'http://example.com/recipe/rcp008'),
    ('rcp009', 9, 'Greek Yogurt Parfait', '2024-05-01', 'D', 300, 'http://example.com/recipe/rcp009'),
    ('rcp010', 10, 'Tofu Stir-fry', '2024-05-01', 'D', 450, 'http://example.com/recipe/rcp010'),
    ('rcp011', 11, 'Avocado Toast', '2024-05-01', 'D', 350, 'http://example.com/recipe/rcp011'),
    ('rcp012', 12, 'Mediterranean Wrap', '2024-05-01', 'L', 500, 'http://example.com/recipe/rcp012'),
    ('rcp013', 13, 'Bean Burrito', '2024-05-01', 'D', 400, 'http://example.com/recipe/rcp013'),
    ('rcp014', 14, 'Sushi Roll', '2024-05-01', 'D', 600, 'http://example.com/recipe/rcp014'),
    ('rcp015', 15, 'Omelette', '2024-05-01', 'D', 400, 'http://example.com/recipe/rcp015'),
    ('rcp016', 16, 'Vegetable Soup', '2024-05-01', 'D', 300, 'http://example.com/recipe/rcp016'),
    ('rcp017', 17, 'Shrimp Scampi', '2024-05-01', 'D', 550, 'http://example.com/recipe/rcp017'),
    ('rcp018', 18, 'Hummus Wrap', '2024-05-01', 'L', 450, 'http://example.com/recipe/rcp018'),
    ('rcp019', 19, 'Fajitas', '2024-05-01', 'D', 500, 'http://example.com/recipe/rcp019'),
    ('rcp020', 20, 'Stuffed Bell Peppers', '2024-05-01', 'D', 400, 'http://example.com/recipe/rcp020');


INSERT INTO ingredients (recipe_id, ingredient_name, quantity, unit_type, price_per_unit) 
VALUES 
    -- Ingredients for Breakfast Burrito (rcp001)
    ('rcp001', '{"Tortilla", "Eggs", "Bacon"}', '{1, 2, 2}', '{"piece", "piece", "slices"}', '{0.50, 0.2, 0.75}'),
    -- Ingredients for Grilled Chicken (rcp002)
    ('rcp002', '{"Chicken Breast", "Olive Oil", "Salt"}', '{1, 2, 1}', '{"piece", "tbsp", "pinch"}', '{2.50, 0.1, 0.05}'),
    -- Ingredients for Veggie Stir-fry (rcp003)
    ('rcp003', '{"Tofu", "Mixed Vegetables", "Soy Sauce"}', '{200, 1, 2}', '{"grams", "pack", "tbsp"}', '{1.20, 3.00, 0.30}'),
    -- Ingredients for Fruit Salad (rcp004)
    ('rcp004', '{"Apple", "Banana", "Orange"}', '{1, 1, 1}', '{"piece", "piece", "piece"}', '{0.75, 0.50, 0.60}'),
    -- Ingredients for Salmon Fillet (rcp005)
    ('rcp005', '{"Salmon Fillet", "Lemon", "Olive Oil"}', '{1, 1, 1}', '{"piece", "piece", "tbsp"}', '{5.00, 0.80, 0.10}'),
    -- Ingredients for Quinoa Salad (rcp006)
    ('rcp006', '{"Quinoa", "Cucumber", "Tomato"}', '{1, 1, 1}', '{"cup", "piece", "piece"}', '{1.50, 0.75, 0.60}'),
    -- Ingredients for Chicken Caesar Salad (rcp007)
    ('rcp007', '{"Chicken Breast", "Romaine Lettuce", "Caesar Dressing"}', '{1, 2, 2}', '{"piece", "cups", "tbsp"}', '{2.50, 1.00, 0.50}'),
    -- Ingredients for Pasta Primavera (rcp008)
    ('rcp008', '{"Pasta", "Broccoli", "Bell Pepper"}', '{2, 1, 1}', '{"cups", "cup", "piece"}', '{1.00, 0.75, 0.80}'),
    -- Ingredients for Greek Yogurt Parfait (rcp009)
    ('rcp009', '{"Greek Yogurt", "Granola", "Berries"}', '{1, 0.5, 0.5}', '{"cup", "cup", "cup"}', '{1.00, 1.20, 0.80}'),
    -- Ingredients for Tofu Stir-fry (rcp010)
    ('rcp010', '{"Tofu", "Bell Pepper", "Broccoli"}', '{200, 1, 1}', '{"grams", "piece", "cup"}', '{1.20, 0.80, 0.75}'),
    -- Ingredients for Avocado Toast (rcp011)
    ('rcp011', '{"Avocado", "Bread", "Tomato"}', '{1, 2, 1}', '{"piece", "slices", "piece"}', '{1.50, 0.50, 0.60}'),
    -- Ingredients for Mediterranean Wrap (rcp012)
    ('rcp012', '{"Chicken Breast", "Hummus", "Whole Wheat Wrap"}', '{1, 2, 1}', '{"piece", "tbsp", "piece"}', '{2.50, 0.80, 1.00}'),
    -- Ingredients for Bean Burrito (rcp013)
    ('rcp013', '{"Black Beans", "Tortilla", "Cheese"}', '{1, 1, 0.5}', '{"cup", "piece", "cup"}', '{0.75, 0.50, 1.00}'),
    -- Ingredients for Sushi Roll (rcp014)
    ('rcp014', '{"Sushi Rice", "Nori", "Cucumber"}', '{1, 2, 1}', '{"cup", "sheets", "piece"}', '{1.00, 0.50, 0.75}'),
    -- Ingredients for Omelette (rcp015)
    ('rcp015', '{"Eggs", "Mushrooms", "Cheese"}', '{3, 0.5, 0.5}', '{"piece", "cup", "cup"}', '{0.20, 0.80, 1.00}'),
    -- Ingredients for Vegetable Soup (rcp016)
    ('rcp016', '{"Vegetable Broth", "Carrot", "Potato"}', '{2, 1, 1}', '{"cups", "piece", "piece"}', '{1.00, 0.50, 0.60}'),
    -- Ingredients for Shrimp Scampi (rcp017)
    ('rcp017', '{"Shrimp", "Garlic", "Lemon"}', '{200, 2, 1}', '{"grams", "cloves", "piece"}', '{3.00, 0.40, 0.80}'),
    -- Ingredients for Hummus Wrap (rcp018)
    ('rcp018', '{"Hummus", "Whole Wheat Wrap", "Cucumber"}', '{2, 1, 1}', '{"tbsp", "piece", "piece"}', '{0.80, 1.00, 0.75}'),
    -- Ingredients for Fajitas (rcp019)
    ('rcp019', '{"Chicken Breast", "Bell Pepper", "Onion"}', '{1, 1, 1}', '{"piece", "piece", "piece"}', '{2.50, 0.80, 0.60}'),
    -- Ingredients for Stuffed Bell Peppers (rcp020)
    ('rcp020', '{"Bell Pepper", "Ground Beef", "Rice"}', '{2, 200, 1}', '{"pieces", "grams", "cup"}', '{1.50, 3.00, 1.00}');



INSERT INTO favorite_meals (recipe_name, recipe_id, user_id)
VALUES
('Breakfast Burrito', 'rcp001', 1),
('Grilled Chicken', 'rcp002', 1),
('Veggie Stir-fry', 'rcp003', 3),
('Fruit Salad', 'rcp004', 4),
('Salmon Fillet', 'rcp005', 2),
('Quinoa Salad', 'rcp006', 6),
('Chicken Caesar Salad', 'rcp007', 5),
('Pasta Primavera', 'rcp008', 8),
('Greek Yogurt Parfait', 'rcp009', 9),
('Tofu Stir-fry', 'rcp010', 10),
('Avocado Toast', 'rcp011', 11),
('Mediterranean Wrap', 'rcp012', 12),
('Bean Burrito', 'rcp013', 15),
('Sushi Roll', 'rcp014', 14),
('Omelette', 'rcp015', 15),
('Vegetable Soup', 'rcp016', 8),
('Shrimp Scampi', 'rcp017', 17),
('Hummus Wrap', 'rcp018', 7),
('Fajitas', 'rcp019', 19),
('Stuffed Bell Peppers', 'rcp020', 20);