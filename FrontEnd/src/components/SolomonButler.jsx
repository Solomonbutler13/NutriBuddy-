import './teamMembers.css'; // Import CSS file for styling
import solomonButlerImage from '../assets/images/Solomon-Butler.jpg';
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";

const SolomonButler = () => {
    return (
        <div className="team-member-card">
            <img src={solomonButlerImage} alt="Solomon Butler" className="headshot" />
            <h3 className="name">Solomon Butler</h3>
            <div className="social-links">
                <a href="https://github.com/Solomonbutler13" target="_blank" rel="noopener noreferrer">
                    <FaGithubSquare className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/solomon-butler-63aa20210/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                </a>
            </div>
            <div className="role">
                <p>HEADS OF QA, IDENTIFIED AND DOCUMENTED BUGS</p>
                <p>MANAGED GIT REPO WITHIN GITHUB</p>
            </div>
        </div>
    );
};

export default SolomonButler;
