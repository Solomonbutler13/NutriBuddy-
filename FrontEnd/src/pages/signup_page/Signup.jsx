import './signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from "../../components/UserData"

export default function SignUp() {
    const navigate = useNavigate();

    // Allow user to store data
    const store = useStore();

    // Get user input data
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    // This state allows error message to be displayed
    const [checkErrors, setCheckErrors] = useState({
        emailEmpty: false,
        passwordEmpty: false,
        passwordDifferent: false
    });

    // This function checks for changes in user input
    const handleInfoChange = (input) => {
        const { name, value } = input.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    // This function checks the info before passing it on
    function checkInput() {
        const { email, password, confirmPassword } = loginInfo;
        // Let the default be there is no error
        setCheckErrors({emailEmpty:false, passwordEmpty:false, passwordDifferent:false})
        let noErrors = true;

        // Checks for errors
        if (email === ''){
            setCheckErrors(errors => ({ ...errors, emailEmpty: true }));
            noErrors = false;
        }else if(password === '' || confirmPassword === ''){
            setCheckErrors(errors => ({ ...errors, passwordEmpty: true }));
            noErrors = false;
        }
        else if (password !== confirmPassword){
            setCheckErrors(errors => ({ ...errors, passwordDifferent: true }));
            noErrors = false;
        }
        
        // Send info if there is no error and goto next page
        if(noErrors){
            store.setInfo('email', email);
            store.setInfo('password', password);
            navigate('/personal_info');
        }
    }

    return (
        <div className="signUpPageContainer">
            <div className="signUpInfoContainer">
                <div className="signUpPageInfo">
                    <h1>Create An Account</h1>
                </div>

                <input name='email' type='email' placeholder='Enter Email' value={loginInfo.email} onChange={handleInfoChange}/>
                <input name='password' type='password' placeholder='Create Password' value={loginInfo.password} onChange={handleInfoChange} />
                <input name='confirmPassword' type="password" placeholder='Confirm Password' value={loginInfo.confirmPassword} onChange={handleInfoChange} />

                <button onClick={checkInput}>Next</button>

                <div className="toLogin">
                    <p>Already have an account?</p>
                    <a href='/'> Login </a>
                </div>

                {checkErrors.emailEmpty && <p id='emailEmpty'>Email is empty!</p>}
                {checkErrors.passwordEmpty && <p id='passwordEmpty'>Password is empty</p>}
                {checkErrors.passwordDifferent && <p id='passwordDifferent'>Password doesn't match!</p>}

            </div>
        </div>
    );
}