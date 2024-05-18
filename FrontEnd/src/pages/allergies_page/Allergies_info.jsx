import { useState } from "react";
import { useStore } from "../../components/UserData"
import './allergies_info.css';
import { useNavigate } from 'react-router-dom';

export default function Allergies(){

    // Allow user to store data
    const store = useStore();

    // Allow user to change pages
    const navigate = useNavigate();

    // This state allows button active to be checked
    const [checkAllergies, setCheckAllergies] = useState({
        Fish: false,
        Soy: false,
        Milk: false,
        Shellfish: false,
        Nuts: false,
        Eggs: false,
        Wheat: false,
        Sesame: false
    })

    // Check button clicks
    const handleChange = (input) => {
        const { name } = input.target;
        setCheckAllergies(prev => ({...prev, [name]: !prev[name]}));
    }

    //  Goto the previous page
    function previousPage(){
        navigate('/diet_info');
    }

    // // Check input before submitting
    function checkInput(){
        const { Fish, Soy, Milk, Shellfish, Nuts, Eggs, Wheat, Sesame } = checkAllergies;

        store.setInfo('Fish', Fish);
        store.setInfo('Soy', Soy);
        store.setInfo('Milk', Milk);
        store.setInfo('Shellfish', Shellfish);
        store.setInfo('Nuts', Nuts);
        store.setInfo('Eggs', Eggs);
        store.setInfo('Wheat', Wheat);
        store.setInfo('Sesame', Sesame);
        navigate('/activity_info');
    }

    return(
        <div className="allergiesPageContainer">
            <div className="allergiesPageInfoContainer">
                <div className="allergiesPageInfo">
                    <h1>Allergies</h1>
                </div>
                
                <div className="allergiesOptionContainer">
                    <button name="Fish" onClick={handleChange} style={{backgroundColor: checkAllergies.Fish ? "green" : "red"}}>Fish</button>
                    <button name="Soy" onClick={handleChange} style={{backgroundColor: checkAllergies.Soy ? "green" : "red"}}>Soy</button>
                    <button name="Milk" onClick={handleChange} style={{backgroundColor: checkAllergies.Milk ? "green" : "red"}}>Milk</button>
                    <button name="Shellfish" onClick={handleChange} style={{backgroundColor: checkAllergies.Shellfish ? "green" : "red"}}>Shell Fish</button>
                    <button name="Nuts" onClick={handleChange} style={{backgroundColor: checkAllergies.Nuts ? "green" : "red"}}>Nuts</button>
                    <button name="Eggs" onClick={handleChange} style={{backgroundColor: checkAllergies.Eggs ? "green" : "red"}}>Eggs</button>
                    <button name="Wheat" onClick={handleChange} style={{backgroundColor: checkAllergies.Wheat ? "green" : "red"}}>Wheat</button>
                    <button name="Sesame" onClick={handleChange} style={{backgroundColor: checkAllergies.Sesame ? "green" : "red"}}>Sesame</button>
                </div>

                <div className="allergiesPageContinue">
                    <button onClick={previousPage}>Back</button>
                    <button onClick={checkInput}>Next</button>
                </div>
            </div>
        </div>
    )
}