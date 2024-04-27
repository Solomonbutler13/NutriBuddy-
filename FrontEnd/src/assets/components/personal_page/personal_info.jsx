import { useStore } from "../../../pages/signup_page/signup.jsx"

export default function PersonalPage(){

    // Get the data from signup page
    const { email, password } = useStore(state => ({
        email: state.email,
        password: state.password
    }));

    console.log(email)
    console.log(password)

    return(
        <>
        Hello
        </>
    )
}