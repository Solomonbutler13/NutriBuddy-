import { useStore } from "../components/UserData"

export default function Test(){

    const { email, firstName, lastName, age, gender, weight, height, activityLevel, keto, vegan, lowCarb,
    Fish, Soy, Milk, Shellfish, Nuts, Eggs, Wheat, Sesame } = useStore(state => ({
    email: state.email,
    firstName: state.firstName,
    lastName: state.lastName,
    age: state.age,
    gender: state.gender,
    weight: state.weight,
    height: state.height,
    activityLevel: state.activityLevel,
    keto: state.keto,
    vegan: state.vegan,
    lowCarb: state.lowCarb,
    Fish: state.Fish,
    Soy: state.Soy,
    Milk: state.Milk,
    Shellfish: state.Shellfish,
    Nuts: state.Nuts,
    Eggs: state.Eggs,
    Wheat: state.Wheat,
    Sesame: state.Sesame

}))

    return(
        <>
        Email: {email} <br/>
        Name: {firstName} {lastName} <br/>
        age: {age} <br/>
        gender: {gender} <br/>
        weight: {weight} <br/>
        height: {height} <br/>
        activityLevel: {activityLevel} <br/><br/>

        Diet Preference <br/>
        keto: {keto.toString()} <br/>
        vegan: {vegan.toString()} <br/>
        lowCarb: {lowCarb.toString()} <br/><br/>

        Allergies<br/>
        Fish: {Fish.toString()} <br/>
        Soy: {Soy.toString()} <br/>
        Milk: {Milk.toString()} <br/>
        Shellfish: {Shellfish.toString()} <br/>
        Nuts: {Nuts.toString()} <br/>
        Eggs: {Eggs.toString()} <br/>
        Wheat: {Wheat.toString()} <br/>
        Sesame: {Sesame.toString()} <br/>
        </>
    )
}