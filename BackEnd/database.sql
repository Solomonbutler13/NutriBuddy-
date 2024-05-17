\c postgres

-- Drop the database if it exists
DROP DATABASE IF EXISTS nutribuddy;

-- Create the database
CREATE DATABASE nutribuddy;

-- Connect to the database
\c nutribuddy

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(16),
    last_name VARCHAR(16),
    age INTEGER,
    email VARCHAR(100),
    curr_weight FLOAT,
    goal_weight FLOAT,
    height FLOAT,
    calorie_goal INTEGER,
    fish BOOLEAN,
    soy BOOLEAN,
    milk BOOLEAN,
    shellfish BOOLEAN,
    nuts BOOLEAN,
    eggs BOOLEAN,
    wheat BOOLEAN,
    sesame BOOLEAN
);

-- Create the meal table
CREATE TABLE meal (
    id SERIAL PRIMARY KEY,
    recipe_id TEXT,
    user_id INTEGER REFERENCES users(id),
    meal_name VARCHAR(100),
    meal_time DATE,
    meal_type CHAR,
    meal_calories INTEGER
);

-- Create the ingredients table
CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    recipe_id TEXT,
    ingredient_name VARCHAR(30),
    quantity INTEGER,
    unit_type VARCHAR(30),
    price_per_unit FLOAT
);

-- Create the favorite_meals table
CREATE TABLE favorite_meals (
    id SERIAL PRIMARY KEY,
    recipe_name VARCHAR(100),
    recipe_id TEXT,
    user_id INTEGER REFERENCES users(id)
);

\i seed.sql