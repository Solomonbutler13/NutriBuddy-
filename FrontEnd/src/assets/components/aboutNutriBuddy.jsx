import React, { useState, useEffect } from 'react';
import './AboutNutriBuddy.css'; // Import CSS file for styling

const AboutNutriBuddy = () => {
    const statements = [
        "NutriBuddy: Empowering with AI-driven nutrition assistance for personalized health journeys",
        "NutriBuddy's mission: Making healthy eating easy, enjoyable, and accessible for all."
    ];
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const typingTimer = setTimeout(() => {
            if (currentCharacterIndex < statements[currentStatementIndex].length) {
                setCurrentCharacterIndex(currentCharacterIndex + 1);
            } else {
                setTimeout(() => setVisible(false), 10000); // Adjust delay before hiding the statement
                setCurrentCharacterIndex(0);
            }
        }, 100); // Adjust typing speed here

        return () => clearTimeout(typingTimer);
    }, [currentCharacterIndex, currentStatementIndex, statements]);

    useEffect(() => {
        if (!visible) {
            const nextIndex = (currentStatementIndex + 1) % statements.length;
            setCurrentStatementIndex(nextIndex);
            setCurrentCharacterIndex(0); // Reset character index when transitioning to the next statement
            setVisible(true);
        }
    }, [currentStatementIndex, statements, visible]);

    return (
        <div className="about-nutribuddy">
            <h2>About NutriBuddy</h2>
            <p className={`statement ${visible ? 'typing' : ''}`}>
                {statements[currentStatementIndex].substring(0, currentCharacterIndex)}
            </p>
        </div>
    );
};

export default AboutNutriBuddy;
