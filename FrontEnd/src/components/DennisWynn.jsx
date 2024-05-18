import React from 'react';
import './teamMembers.css'; // Import CSS file for styling
import dennisWynnImage from '../assets/images/Dennis-Wynn.jpg'; // Import image
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";


const DennisWynn = () => {
    return (
        <div className="team-member-card">
            <img src={dennisWynnImage} alt="Dennis Wynn" className="headshot" />
            <h3 className="name">Dennis Wynn</h3>
            <div className="social-links">
                <a href="https://github.com/denniswynn22" target="_blank" rel="noopener noreferrer">
                <FaGithubSquare className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/dennis-wynn-bkny22/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='social-icon'/>
                </a>
            </div>
            <div className="role">
                <p>DIRECTED PROJECT VISION AND ENSURED ALIGNMENT WITH GOALS</p>
                <p>MANAGED BACKLOGS, SPRINTS, AND PRIORITIZATION WITHIN AZURE DEVOPS</p>
            </div>
        </div>
    );
};

export default DennisWynn;
