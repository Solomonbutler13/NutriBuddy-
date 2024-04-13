import './signup.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Allow Zustand to store data
export const useStore = create(persist(set => ({
    email: '',
    password: '',
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
}), {
    name: 'user-data',
}));

export default function SignUp() {
    const navigate = useNavigate();
    // These two allows user to store email and password in Zustand
    const setEmail = useStore(state => state.setEmail);
    const setPassword = useStore(state => state.setPassword);

    // This use state gets the info from the inputs
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    // This use state checks for 3 possible errors from user
    const [checkErrors, setCheckErrors] = useState({
        emailEmpty: false,
        passwordEmpty: false,
        passwordDifferent: false
    });

    // Change info as user types
    const handleChange = (input) => {
        const { name, value } = input.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    // Check input before submitting
    function checkInput() {
        const { email, password, confirmPassword } = loginInfo;
        // Let the default be there is no error
        setCheckErrors({emailEmpty:false, passwordEmpty:false, passwordDifferent:false})
        let noErrors = true;

        // Check for errors and change that one error while not touching the other errors
        if (email === ''){
            setCheckErrors(errors => ({ ...errors, emailEmpty: true }));
            noErrors = false;
        }
        else if (password !== confirmPassword){
            setCheckErrors(errors => ({ ...errors, passwordEmpty: true }));
            noErrors = false;
        }else if(password === '' || confirmPassword === ''){
            setCheckErrors(errors => ({ ...errors, passwordDifferent: true }));
            noErrors = false;
        }
        // Send info to Zustand and proceed to the next page if there are no errors
        if(noErrors){
            setEmail(email);
            setPassword(password);
            navigate('/personal_info');
        }
    }

    return (
        <div className="signUpPageContainer">
            <div className="infoContainer">
                <div className="pageInfo">
                    <h1>Create An Account</h1>
                </div>

                <input name='email' type='email' placeholder='Enter Email' value={loginInfo.email} onChange={handleChange}/>
                <input name='password' type='password' placeholder='Create Password' value={loginInfo.password} onChange={handleChange} />
                <input name='confirmPassword' type="password" placeholder='Confirm Password' value={loginInfo.confirmPassword} onChange={handleChange} />

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