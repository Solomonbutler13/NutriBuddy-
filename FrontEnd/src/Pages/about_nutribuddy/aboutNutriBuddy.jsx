import { useState, useEffect } from 'react';
import './AboutNutriBuddy.css'; // Import CSS file for styling
import DidarKhan from '../../components/DidarKhan';
import JasonWang from '../../components/JasonWang';
import DennisWynn from '../../components/DennisWynn';
const AboutNutriBuddy = () => {
    const statements = [
        "NutriBuddy: Empowering with AI-driven nutrition assistance for personalized health journeys",
        "NutriBuddy's Mission: Making healthy eating easy, enjoyable, and accessible for all."
    ];
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const typingTimer = setTimeout(() => {
            if (currentCharacterIndex < statements[currentStatementIndex].length) {
                setCurrentCharacterIndex(currentCharacterIndex + 1);
            } else {
                setTimeout(() => {
                    setCurrentCharacterIndex(0);
                    setVisible(false);
                }, 3000); // Adjust delay before hiding the statement
            }
        }, 100); // Adjust typing speed here

        return () => clearTimeout(typingTimer);
    }, [currentCharacterIndex, currentStatementIndex, statements, visible]);

    useEffect(() => {
        if (!visible) {
            const nextIndex = (currentStatementIndex + 1) % statements.length;
            setCurrentStatementIndex(nextIndex);
            setVisible(true);
        }
    }, [currentStatementIndex, statements, visible]);

    return (
        <div className="about-nutribuddy">
            <h2>About NutriBuddy</h2>
            <p className={`statement ${visible ? 'typing' : ''}`}>
                {statements[currentStatementIndex].substring(0, currentCharacterIndex)}
            </p>
            <div className="meet-the-team">
                <h2>Meet The Team</h2>
                <DidarKhan />
                <JasonWang />
                <DennisWynn />
                {/* Add components for other team members here */}
            </div>
        </div>
    );
};

export default AboutNutriBuddy;
