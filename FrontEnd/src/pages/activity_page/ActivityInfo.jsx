import { useState } from "react";
import { useStore } from "../../components/UserData.jsx";
import './activityInfo.css';
import { useNavigate } from 'react-router-dom';

export default function Activity(){

    // Allow user to store data
    const store = useStore();

    // Allow user to change pages
    const navigate = useNavigate();

    // This state allows button active to be checked
    const [activityLevel, setActivityLevel] = useState('');

    //  Goto the previous page
    function previousPage(){
        navigate('/allergies_info');
    }

    // Update activity level
    function handleActivityLevel(level){
        setActivityLevel(level);
    }

    // Check input before submitting
    function checkInput(){
        store.setInfo('activityLevel', activityLevel);
        navigate('/test');
    }

    return(
        <div className="activityPageContainer">
            <div className="activityPageInfoContainer">
                <div className="activityPageInfo">
                    <h1>Activity Level</h1>
                </div>
                
                <div className="activityOptionContainer">
                    <button name="Inactive" onClick={() => handleActivityLevel('Inactive')} style={{backgroundColor: activityLevel === "Inactive" ? "green"  : "white"}}>Inactive</button>
                    <button name="Moderate" onClick={() => handleActivityLevel('Moderate')} style={{backgroundColor: activityLevel === "Moderate" ? "green"  : "white"}}>Moderate</button>
                    <button name="Intense" onClick={() => handleActivityLevel('Intense')} style={{backgroundColor: activityLevel === "Intense" ? "green"  : "white"}}> Intense</button>
                </div>

                <div className="activityPageContinue">
                    <button onClick={previousPage}>Back</button>
                    <button onClick={checkInput}>Finish</button>
                </div>
            </div>
        </div>
    );
}
