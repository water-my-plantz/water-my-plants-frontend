// 1. `user` can sign-up / create an account by providing a unique `username`, a valid mobile `phoneNumber` and a `password`.

import "../../App.css"
import { useContext, useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { GlobalPropsContext } from '../GlobalPropsContext'
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import signupFormSchema from "../../validation/signupFormSchema.js";
import * as yup from 'yup'





const initialsignUpFormValues = {
    username: '',
    phone_number: '',
    password: '',
    retypePassword: '',
}

const initialSignUpFormErrors = {
    username: '',
    phone_number: '',
    password: '',
}


// submit is disabled until inputs validated
const initialDisabled = false;


export default function Signup() {
    const [signUpFormValues, setSignUpFormValues] = useState(initialsignUpFormValues);
    // const [signupErrors, setSignupErrors] = useState(initialSignupFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled);
    const { isLoggedIn, setIsLoggedIn } = useContext(GlobalPropsContext);
    let history = useHistory();


    // controls the form input changes via state
    const onChange = (e) => {
        const { name, value } = e.target;
        //validation
    //     yup
    //     .reach(signupFormSchema, name)
    //     .validate(value)
    //     .then(() => {
    //         setSignupErrors({ ...signupErrors, [name]: "" });
    //     })
    //     .catch((err) => {
    //         setSignupErrors({ ...signupErrors, [name]: err.message });
    //     });
    // console.log(signupErrors);

        setSignUpFormValues({
            ...signUpFormValues, [e.target.name]: e.target.value
        })
    }

    	//ENABLE BUTTON WHEN NO ERRORS EXIST
	// useEffect(() => {
    //     signupFormSchema.isValid(signupFormValues).then((isSchemaValid) => {
	// 		setCreateDisabled(!isSchemaValid);
	// 	});
	// }, [signupFormValues]);

    const signupSubmitHandler = (e) => {
        e.preventDefault();


        const newUser = {
            username: signUpFormValues.username, 
            password: signUpFormValues.password, 
            phone_number: signUpFormValues.phone_number
        }

        axiosWithAuth().post('https://water-my-plants-fullstack-api.herokuapp.com/user/register', newUser)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                const message = res.data.message.split(" ");
                const user = message[2];
                localStorage.setItem("user", user);
                console.log("signup", res);
                history.push('/plants');
                setIsLoggedIn(true);
            })
            .catch(err => {
                console.log(err);
                <Redirect to="/signup"/>
            })
    }



    return (
        <div>
            <div>
                <form onSubmit={signupSubmitHandler} className="form">
                    <h1>Sign Up</h1>

                    <input
                        placeholder="username"
                        name="username"
                        label="username"
                        type="text"
                        id="username"
                        onChange={onChange}
                        value={signUpFormValues.username}
                    />

                    <input
                        placeholder="phone number"
                        name="phone_number"
                        label="phone_number"
                        type="text"
                        id="phone_number"
                        onChange={onChange}
                        value={signUpFormValues.phone_number}
                    />

                    <input
                        placeholder="password"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={onChange}
                        value={signUpFormValues.password}
                    />
                    <input
                        placeholder="re-type password"
                        name="retypePassword"
                        label="retypePassword"
                        type="password"
                        id="retypePassword"
                        onChange={onChange}
                        value={signUpFormValues.retypePassword}
                    />						
                    
                    {/* RENDER THE VALIDATION ERRORS HERE */}
                        {/* <div className="formErrors">
						<div>{createPotluckErrors.title}</div>
						<div>{createPotluckErrors.date}</div>
						<div>{createPotluckErrors.time}</div>
						<div>{createPotluckErrors.location}</div>
						</div> */}
                    <button type="submit" disabled={disabled}>
                        Sign Up!
                    </button>
                </form>
                <p onClick={() => { history.push('/') }} className="signUpFinePrintUnderForm" >
                    <span style={{display: "inline"}}>
                        Already Have An Account?...Login Here!
                    </span>
                </p>
            </div>
        </div>
    )
}


