import './teamMembers.css'; // Import CSS file for styling
import jasonWangImage from '../assets/images/Jason-Wang.jpg'; // Import image
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";


const JasonWang = () => {
    return (
        <div className="team-member-card">
            <img src={jasonWangImage} alt="Jason Wang" className="headshot" />
            <h3 className="name">Jason Wang</h3>
            <div className="social-links">
                <a href="https://github.com/Jason2945" target="_blank" rel="noopener noreferrer">
                <FaGithubSquare className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/jason-wang-69863a176/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className='social-icon'/>
                </a>
            </div>
            <div className="role">
                <p>LEAD THE TECHNICAL DEVELOPMENT AND ARCHITECTURAL DECISIONS</p>
                <p>ENSURED INTEGRETION OF FRONT END AND BACKEND COMPONENTS</p>
            </div>
        </div>
    );
};

export default JasonWang;
