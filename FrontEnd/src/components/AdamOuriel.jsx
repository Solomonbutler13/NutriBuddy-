import React from 'react';
import './teamMembers.css'; // Import CSS file for styling
// Import image Under this
import adamOurielImage from '../assets/images/Adam-Ouriel.jpg';
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";


const AdamOuriel = () => {
    return (
        <div className="team-member-card">
            {/* INSERT IMAGE */}
            <img src={adamOurielImage} alt="Adam Ouriel" className="headshot" />
            <h3 className="name">Adam Ouriel</h3>
            <div className="social-links">
                <a href="https://github.com/adamouriel" target="_blank" rel="noopener noreferrer">
                <FaGithubSquare className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/adam-ouriel-a02071273/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='social-icon'/>
                </a>
            </div>
            <div className="role">
                <p>LEAD DEVELOPER REVIEWER FOR PR FLOW</p>
                <p>LEAD UX/QA FOR PR FLOW</p>
            </div>
        </div>
    );
};

export default AdamOuriel;
