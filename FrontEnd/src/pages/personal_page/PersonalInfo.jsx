import { useState } from "react";
import { useStore } from "../../components/UserData"
import './personalInfo.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'

export default function PersonalInfo(){

    const {
        logout,
    } = useAuth0();

    // Allow user to store data
    const store = useStore();

    // Allow user to change pages
    const navigate = useNavigate();

    // This use state gets the personal info from the inputs
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        age: 0,
        gender: "Male",
        goalWeight: 0,
        weight: 0,
        height: 0,
    })

    // This state allows error message to be displayed
    const [checkErrors, setCheckErrors] = useState({
        nameError:false,
        ageError: false,
        weightError: false,
        heightError: false
    });

    // Change info as user types
    const handleChange = (input) => {
        const { name, value } = input.target;
        setPersonalInfo(prev => ({...prev, [name]: value}));
    }

    //  Goto the previous page
    function previousPage(){
        logout();
    }

    // Check input before submitting
    function checkInput(){
        const { firstName, lastName, age, gender, weight, goalWeight, height } = personalInfo;
        setCheckErrors({nameError:false, ageError:false, weightError:false})
        let noErrors = true;

        if (firstName.length < 1 || lastName.length < 1){
            setCheckErrors(errors => ({ ...errors, nameError: true}));
            noErrors = false;
        }
        else if (age < 13){
            setCheckErrors(errors => ({ ...errors, ageError: true}));
            noErrors = false;
        }else if ((weight < 50 || weight > 1500) || (goalWeight < 5 || goalWeight > 1500)){
            setCheckErrors(errors => ({ ...errors, weightError: true}));
            noErrors = false;
        }else if (height < 24 || height > 96){
            setCheckErrors(errors => ({ ...errors, heightError: true}));
            noErrors = false;
        }
        
        if(noErrors){
            store.setInfo('firstName', firstName);
            store.setInfo('lastName', lastName);
            store.setInfo('age', age);
            store.setInfo('gender', gender);
            store.setInfo('goalWeight', goalWeight);
            store.setInfo('weight', weight);
            store.setInfo('height', height);
            navigate('/diet_info'); 
        }     
    }

    return(
        <div className="personalPageContainer">
            <div className="personalPageInfoContainer">
                <div className="personalPageInfo">
                    <h1>Personal Information</h1>
                </div>

                <div className="personalPageNameContainer">
                    <input name="firstName" type="text" placeholder="First Name" onChange={handleChange}/>
                    <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange}/>
                </div>

                <div className="personalPageAgeContainer">
                    <label>Age</label>
                    <select id="selectAge" name='age' onChange={handleChange}>
                        {Array.from({length: 100}, (_, i)=> (
                            <option key={i} value={i}>{i}</option>
                        ))};
                    </select>
                </div>
                
                <div className="personalPageGenderContainer">
                    <label>Gender</label>
                    <select id="selectGender" name="gender" onChange={handleChange}>
                        <option key="male" value="Male">Male</option>
                        <option key="female" value="Female">Female</option>
                        <option key="other" value="Other">Other</option>
                    </select>
                </div>
                
                <div className="personalPageWeightContainer">
                    <label>Weight</label>
                    <input name='weight' id='userWeightInput' type="number" step=".1" min="50" max="1500" onChange={handleChange}/>

                    <label>Goal Weight</label>
                    <input name='goalWeight' id='userGoalWeightInput' type="number" step=".1" min="50" max="1500" onChange={handleChange}/>
                    <label> lbs </label>
                </div>

                <div className="personalPageHeightContainer">
                    <label>Height</label>
                    <input name='height' id='userHeightInput' type="number"step="1" onChange={handleChange}/>
                    <label> inch </label>
                </div>

                <div className="personalPageContinue">
                    <button onClick={previousPage}>Back</button>
                    <button onClick={checkInput}>Next</button>
                </div>

                {checkErrors.nameError && <p id='nameError'>You forgot to fill out your name!</p>}
                {checkErrors.ageError && <p id='ageError'>You are too young to make an account!</p>}
                {checkErrors.heightError && <p id='heightError'>Your height doesn't look correct!</p>}
            </div>
        </div>
    )
}