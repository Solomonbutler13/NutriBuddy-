import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion (This should make the animation a little smoother)
import './aboutNutriBuddy.css'; 
import DidarKhan from '../../components/DidarKhan';
import JasonWang from '../../components/JasonWang';
import DennisWynn from '../../components/DennisWynn';
import AdamOuriel from '../../components/AdamOuriel';
import SolomonButler from '../../components/SolomonButler';

const statements = [
    "NutriBuddy: Empowering with AI-driven nutrition assistance for personalized health journey"
];
const AboutNutriBuddy = () => {
    const [currentStatementIndex, setCurrentStatementIndex] = useState(0);
    const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [currentTeamMemberIndex, setCurrentTeamMemberIndex] = useState(0);

    useEffect(() => {
                const typingTimer = setTimeout(() => {
                    if (currentCharacterIndex < statements[currentStatementIndex].length) {
                        setCurrentCharacterIndex(currentCharacterIndex + 1);
                    } else {
                        setTimeout(() => {
                            setCurrentCharacterIndex(0);
                            setVisible(true);
                        }, 4000); // Adjust delay before hiding the statement
                    }
                }, 100); // Adjust typing speed here
        
                return () => clearTimeout(typingTimer);
            }, [currentCharacterIndex, currentStatementIndex, visible]);
        
            useEffect(() => {
                if (!visible) {
                    const nextIndex = (currentStatementIndex + 1) % statements.length;
                    setCurrentStatementIndex(nextIndex);
                    setVisible(true);
                }
            }, [currentStatementIndex, visible]);

    useEffect(() => {
        const teamMemberTimer = setInterval(() => {
            setCurrentTeamMemberIndex(currentIndex => (currentIndex + 1) % 5);
            setVisible(true);
        }, 5000); // Adjust delay between each team member appearing

        return () => clearInterval(teamMemberTimer);
    }, [ currentTeamMemberIndex, setVisible]);

    return (
        <div className="about-nutribuddy">
            <h2>About NutriBuddy</h2>
            <p className={`statement ${visible ? 'typing' : ''}`}>
                {statements[currentStatementIndex].substring(0, currentCharacterIndex)}
            </p>
            <div className="meet-the-team">
                <h2>Meet The Team</h2>
                <motion.div
                    initial={{ opacity: 0 }} // Initial state (hidden)
                    animate={{ opacity: 1 }} // Animation when visible
                    exit={{ opacity: 0 }} // Animation when disappearing
                >
                    {
                        [<DidarKhan key='Didar'/>, <JasonWang key='Jason'/>, <DennisWynn key='Dennis'/>, <AdamOuriel key='Adam'/>, <SolomonButler key='Solomon'/>][currentTeamMemberIndex]
                    }
                </motion.div>
            </div>
        </div>
    );
};

export default AboutNutriBuddy;
