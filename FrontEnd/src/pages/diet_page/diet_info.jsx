import { useState } from "react";
import { useStore } from "../../components/userData";
import './diet_info.css';
import { useNavigate } from 'react-router-dom';

export default function Diet(){

    // Allow user to store data
    const store = useStore();

    // Allow user to change pages
    const navigate = useNavigate();

    // This state allows button active to be checked
    const [checkButtons, setCheckButtons] = useState({
        keto: false,
        vegan: false,
        lowCarb: false
    })

    // Check button clicks
    const handleChange = (input) => {
        const { name } = input.target;
        setCheckButtons(prev => ({...prev, [name]: !prev[name]}));
    }

    //  Goto the previous page
    function previousPage(){
        navigate('/personal_info');
    }

    // Check input before submitting
    function checkInput(){
        const { keto, vegan, lowCarb } = checkButtons;

        store.setInfo('keto', keto);
        store.setInfo('vegan', vegan);
        store.setInfo('lowCarb', lowCarb);
        navigate('/allergies_info');
    }

    return(
        <div className="dietPageContainer">
            <div className="dietPageInfoContainer">
                <div className="dietPageInfo">
                    <h1>Diet Preference</h1>
                </div>
                
                <div className="dietOptionContainer">
                    <button name="keto" onClick={handleChange} style={{backgroundColor: checkButtons.keto ? "lightgreen" : "white"}}>Keto</button>
                    <button name="vegan" onClick={handleChange} style={{backgroundColor: checkButtons.vegan ? "lightgreen" : "white"}}>Vegan</button>
                    <button name="lowCarb" onClick={handleChange} style={{backgroundColor: checkButtons.lowCarb ? "lightgreen" : "white"}}>Low Carb</button>
                </div>

                <div className="dietPageContinue">
                    <button onClick={previousPage}>Back</button>
                    <button onClick={checkInput}>Next</button>
                </div>
            </div>
        </div>
    )
}