import './teamMembers.css'; // Import CSS file for styling
import didarKhanImage from '../assets/images/Didar-Khan.jpg'; // Import image
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const DidarKhan = () => {
    return (
        <div className="team-member-card">
            <img src={didarKhanImage} alt="Didar Khan" className="headshot" />
            <h3 className="name">Didar Khan</h3>
            <div className="social-links">
                <a href="https://github.com/didarkhan97" target="_blank" rel="noopener noreferrer">
                    <FaGithubSquare className="social-icon" />
                </a>
                <a href="https://linkedin.com/in/DK1997" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                </a>
            </div>
            <div className="role">
                <p>ENSURED THE PRODUCT DESIGN IS USER-CENTRIC AND COHESIVE</p>
                <p>UTILIZED AZURE DEVOPS TO TRACK DESIGN RELATED TASKS AND ISSUES</p>
            </div>
        </div>
    );
};

export default DidarKhan;