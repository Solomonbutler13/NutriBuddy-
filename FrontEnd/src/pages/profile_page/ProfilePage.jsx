import React from 'react';
import './ProfilePage.css'; // Ensure CSS is imported for styling
import ProfilePic from '../../components/ProfilePic'; // Importing the ProfilePic component

function ProfilePage() {
    return (
        <div className="profile-page-container">
            {/* Top section containing user profile information */}
            <div className="top-section">
                {/* Profile picture component */}
                <ProfilePic /> 
                {/* Information boxes for weight */}
                <div className="info-box">
                    <h2>Weight</h2>
                    <p>Current: 180 lbs</p>
                    <p>Goal: 160 lbs</p>
                </div>
                {/* Information boxes for calories */}
                <div className="info-box">
                    <h2>Calories</h2>
                    <p>Consumed Today: 2200 kcal</p>
                    <p>Daily Goal: 2000 kcal</p>
                </div>
            </div>
            {/* Bottom section containing meal plan and saved recipes */}
            <div className="bottom-section">
                {/* Box for today's meal plan */}
                <div className="bottom-box">
                    <div className="list-title">Today's Meal Plan</div>
                    <h3>Saturday</h3>
                    {/* List of meal items for the day */}
                    <ul>
                        <li>Overnight Oats</li>
                        <li>Turkey Salad</li>
                        <li>Salmon</li>
                    </ul>
                </div>
                {/* Box for saved recipes */}
                <div className="bottom-box">
                    <div className="list-title">Saved Recipes</div>
                    {/* List of saved recipes with clickable links */}
                    <ul>
                        <li><a href="https://example.com/quinoa-salad">Quinoa Salad with Avocado and Black Beans</a></li>
                        <li><a href="https://example.com/baked-salmon">Baked Salmon with Roasted Vegetables</a></li>
                        <li><a href="https://example.com/stir-fried-tofu">Stir-Fried Tofu with Vegetables</a></li>
                        <li><a href="https://example.com/greek-yogurt-parfait">Greek Yogurt Parfait</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
