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

INSERT INTO meal (recipe_id, user_id, meal_name, meal_time, meal_type, meal_calories) 
VALUES 
('rcp001', 1, 'Breakfast Burrito', '2024-05-01', 'L', 450),
('rcp001', 2, 'Breakfast Burrito', '2024-05-06', 'L', 450),
('rcp002', 2, 'Grilled Chicken', '2024-05-01', 'L', 600),
('rcp003', 2, 'Veggie Stir-fry', '2024-05-07', 'D', 400),
('rcp003', 3, 'Veggie Stir-fry', '2024-05-07', 'D', 400),
('rcp004', 4, 'Fruit Salad', '2024-05-03', 'L', 200),
('rcp005', 5, 'Salmon Fillet', '2024-05-01', 'D', 350),
('rcp006', 6, 'Quinoa Salad', '2024-05-01', 'L', 400),
('rcp007', 7, 'Chicken Caesar Salad', '2024-05-01', 'L', 500),
('rcp008', 8, 'Pasta Primavera', '2024-05-01', 'D', 550),
('rcp009', 9, 'Greek Yogurt Parfait', '2024-05-01', 'D', 300),
('rcp010', 10, 'Tofu Stir-fry', '2024-05-01', 'D', 450),
('rcp011', 11, 'Avocado Toast', '2024-05-01', 'D', 350),
('rcp012', 12, 'Mediterranean Wrap', '2024-05-01', 'L', 500),
('rcp013', 13, 'Bean Burrito', '2024-05-01', 'D', 400),
('rcp014', 14, 'Sushi Roll', '2024-05-01', 'D', 600),
('rcp015', 15, 'Omelette', '2024-05-01', 'D', 400),
('rcp016', 16, 'Vegetable Soup', '2024-05-01', 'D', 300),
('rcp017', 17, 'Shrimp Scampi', '2024-05-01', 'D', 550),
('rcp018', 18, 'Hummus Wrap', '2024-05-01', 'L', 450),
('rcp019', 19, 'Fajitas', '2024-05-01', 'D', 500),
('rcp020', 20, 'Stuffed Bell Peppers', '2024-05-01', 'D', 400);

-- Sample data for the ingredients table
INSERT INTO ingredients (recipe_id, ingredient_name, quantity, unit_type, price_per_unit) 
VALUES 
-- Ingredients for Breakfast Burrito (rcp001)
('rcp001', 'Tortilla', 1, 'piece', 0.50),
('rcp001', 'Eggs', 2, 'piece', 0.20),
('rcp001', 'Bacon', 2, 'slices', 0.75),

-- Ingredients for Grilled Chicken (rcp002)
('rcp002', 'Chicken Breast', 1, 'piece', 2.50),
('rcp002', 'Olive Oil', 2, 'tbsp', 0.10),
('rcp002', 'Salt', 1, 'pinch', 0.05),

-- Ingredients for Veggie Stir-fry (rcp003)
('rcp003', 'Tofu', 200, 'grams', 1.20),
('rcp003', 'Mixed Vegetables', 1, 'pack', 3.00),
('rcp003', 'Soy Sauce', 2, 'tbsp', 0.30),

-- Ingredients for Fruit Salad (rcp004)
('rcp004', 'Apple', 1, 'piece', 0.75),
('rcp004', 'Banana', 1, 'piece', 0.50),
('rcp004', 'Orange', 1, 'piece', 0.60),

-- Ingredients for Salmon Fillet (rcp005)
('rcp005', 'Salmon Fillet', 1, 'piece', 5.00),
('rcp005', 'Lemon', 1, 'piece', 0.80),
('rcp005', 'Olive Oil', 1, 'tbsp', 0.10),

-- Ingredients for Quinoa Salad (rcp006)
('rcp006', 'Quinoa', 1, 'cup', 1.50),
('rcp006', 'Cucumber', 1, 'piece', 0.75),
('rcp006', 'Tomato', 1, 'piece', 0.60),

-- Ingredients for Chicken Caesar Salad (rcp007)
('rcp007', 'Chicken Breast', 1, 'piece', 2.50),
('rcp007', 'Romaine Lettuce', 2, 'cups', 1.00),
('rcp007', 'Caesar Dressing', 2, 'tbsp', 0.50),

-- Ingredients for Pasta Primavera (rcp008)
('rcp008', 'Pasta', 2, 'cups', 1.00),
('rcp008', 'Broccoli', 1, 'cup', 0.75),
('rcp008', 'Bell Pepper', 1, 'piece', 0.80),

-- Ingredients for Greek Yogurt Parfait (rcp009)
('rcp009', 'Greek Yogurt', 1, 'cup', 1.00),
('rcp009', 'Granola', 0.5, 'cup', 1.20),
('rcp009', 'Berries', 0.5, 'cup', 0.80),

-- Ingredients for Tofu Stir-fry (rcp010)
('rcp010', 'Tofu', 200, 'grams', 1.20),
('rcp010', 'Bell Pepper', 1, 'piece', 0.80),
('rcp010', 'Broccoli', 1, 'cup', 0.75),

-- Ingredients for Avocado Toast (rcp011)
('rcp011', 'Avocado', 1, 'piece', 1.50),
('rcp011', 'Bread', 2, 'slices', 0.50),
('rcp011', 'Tomato', 1, 'piece', 0.60),

-- Ingredients for Mediterranean Wrap (rcp012)
('rcp012', 'Chicken Breast', 1, 'piece', 2.50),
('rcp012', 'Hummus', 2, 'tbsp', 0.80),
('rcp012', 'Whole Wheat Wrap', 1, 'piece', 1.00),

-- Ingredients for Bean Burrito (rcp013)
('rcp013', 'Black Beans', 1, 'cup', 0.75),
('rcp013', 'Tortilla', 1, 'piece', 0.50),
('rcp013', 'Cheese', 0.5, 'cup', 1.00),

-- Ingredients for Sushi Roll (rcp014)
('rcp014', 'Sushi Rice', 1, 'cup', 1.00),
('rcp014', 'Nori', 2, 'sheets', 0.50),
('rcp014', 'Cucumber', 1, 'piece', 0.75),

-- Ingredients for Omelette (rcp015)
('rcp015', 'Eggs', 3, 'piece', 0.20),
('rcp015', 'Mushrooms', 0.5, 'cup', 0.80),
('rcp015', 'Cheese', 0.5, 'cup', 1.00),

-- Ingredients for Vegetable Soup (rcp016)
('rcp016', 'Vegetable Broth', 2, 'cups', 1.00),
('rcp016', 'Carrot', 1, 'piece', 0.50),
('rcp016', 'Potato', 1, 'piece', 0.60),

-- Ingredients for Shrimp Scampi (rcp017)
('rcp017', 'Shrimp', 200, 'grams', 3.00),
('rcp017', 'Garlic', 2, 'cloves', 0.40),
('rcp017', 'Lemon', 1, 'piece', 0.80),

-- Ingredients for Hummus Wrap (rcp018)
('rcp018', 'Hummus', 2, 'tbsp', 0.80),
('rcp018', 'Whole Wheat Wrap', 1, 'piece', 1.00),
('rcp018', 'Cucumber', 1, 'piece', 0.75),

-- Ingredients for Fajitas (rcp019)
('rcp019', 'Chicken Breast', 1, 'piece', 2.50),
('rcp019', 'Bell Pepper', 1, 'piece', 0.80),
('rcp019', 'Onion', 1, 'piece', 0.60),

-- Ingredients for Stuffed Bell Peppers (rcp020)
('rcp020', 'Bell Pepper', 2, 'pieces', 1.50),
('rcp020', 'Ground Beef', 200, 'grams', 3.00),
('rcp020', 'Rice', 1, 'cup', 1.00);


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