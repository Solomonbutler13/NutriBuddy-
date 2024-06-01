import { useState, useEffect } from 'react';
import './aboutNutriBuddy.css';
import DidarKhan from '../../components/DidarKhan';
import JasonWang from '../../components/JasonWang';
import DennisWynn from '../../components/DennisWynn';
import AdamOuriel from '../../components/AdamOuriel';
import SolomonButler from '../../components/SolomonButler';

const statements = [
    "NutriBuddy: Meal planning just became easier. Enjoy NutriBuddy"
];

const AboutNutriBuddy = () => {
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

    useEffect(() => {
        const typingTimer = setTimeout(() => {
            if (currentCharacterIndex < statements[currentStatementIndex].length) {
                setCurrentCharacterIndex(currentCharacterIndex + 1);
            } else {
                setTimeout(() => {
                    setCurrentCharacterIndex(0);
                }, 4000); // Adjust delay before hiding the statement
            }
        }, 100); // Adjust typing speed here

        return () => clearTimeout(typingTimer);
    }, [currentCharacterIndex, currentStatementIndex]);

    return (
        <div className="about-nutribuddy">
            <h2>About NutriBuddy</h2>
            <p className="statement">
                {statements[currentStatementIndex].substring(0, currentCharacterIndex)}
            </p>
            <div className="meet-the-team">
                <h2>Meet The Team</h2>
                <div className="team-members">
                    <DidarKhan />
                    <JasonWang />
                    <DennisWynn />
                    <AdamOuriel />
                    <SolomonButler />
                </div>
            </div>
        </div>
    );
};

export default AboutNutriBuddy;
