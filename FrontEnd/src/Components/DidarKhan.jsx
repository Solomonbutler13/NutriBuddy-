import React from 'react';
import './DidarKhan.css'; // Import CSS file for styling
import didarKhanImage from '../Images-Icons/Didar-Khan.jpg'; // Import image



const DidarKhan = () => {
    return (
        <div className="team-member-card">
            <img src={didarKhanImage} alt="Didar Khan" className="headshot" />
            <h3 className="name">Didar Khan</h3>
            <div className="social-links">
                <a href="https://github.com/yourgithubusername" target="_blank" rel="noopener noreferrer">
                    <img src="/path/to/github-icon.png" alt="GitHub" className="social-icon" />
                </a>
                <a href="https://linkedin.com/in/yourlinkedinusername" target="_blank" rel="noopener noreferrer">
                    <img src="/path/to/linkedin-icon.png" alt="LinkedIn" className="social-icon" />
                </a>
            </div>
            <div className="role">
                <p>USER-CENTRIC AND COHESIVE FOCUS</p>
                <p>CONTROLLED ALIGNMENT WITH UI</p>
            </div>
        </div>
    );
};

export default DidarKhan;
