import React from 'react';
import '../component/ProfilePage.css'; // Ensure CSS is imported
import ProfilePic from '../component/ProfilePic';

function ProfilePage() {
    return (
        <div className="profile-page-container">
            <div className="top-section">
              <ProfilePic />
                <div className="info-box">
                    <h2>Weight</h2>
                    <p>Current: 180 lbs</p>
                    <p>Goal: 160 lbs</p>
                </div>
                <div className="info-box">
                    <h2>Calories</h2>
                    <p>Consumed Today: 2200 kcal</p>
                    <p>Daily Goal: 2000 kcal</p>
                </div>
            </div>
            <div className="bottom-section">
                <div className="bottom-box">
                    <div className="list-title">Today's Meal Plan</div>
                    <ul>
                        <li>Overnight Oats</li>
                        <li>Turkey Salad</li>
                        <li>Salmon</li>
                    </ul>
                </div>
                <div className="bottom-box">
                    <div className="list-title">Saved Recipes</div>
                    <ul>
                        <li>Quinoa Salad with Avocado and Black Beans</li>
                        <li>Baked Salmon with Roasted Vegetables</li>
                        <li>Stir-Fried Tofu with Vegetables</li>
                        <li>Greek Yogurt Parfait</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
