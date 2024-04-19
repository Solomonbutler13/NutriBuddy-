import { useStore } from "../components/userdata.jsx";

export default function Test(){

    const { email, firstName, lastName, age, gender, weight, height } = useStore(state => ({
    email: state.email,
    firstName: state.firstName,
    lastName: state.lastName,
    age: state.age,
    gender: state.gender,
    weight: state.weight,
    height: state.height,
}))

    return(
        <>
        Email: {email} <br/>
        Name: {firstName} {lastName} <br/>
        age: {age} <br/>
        gender: {gender} <br/>
        weight: {weight} <br/>
        height: {height} <br/>
        </>
    )
}