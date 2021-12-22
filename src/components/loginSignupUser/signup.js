// 1. `user` can sign-up / create an account by providing a unique `username`, a valid mobile `phoneNumber` and a `password`.

import "../../App.css"
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalPropsContext } from '../GlobalPropsContext'


const initialsignUpFormValues = {
    username: '',
    phoneNumber: '',
    password: '',
    retypePassword: '',
}

const initialSignUpFormErrors = {
    username: '',
    phoneNumber: '',
    password: '',
    retypePassword: '',
}

// submit is disabled until inputs validated
const initialDisabled = true;


export default function Signup() {
    const [signUpFormValues, setSignUpFormValues] = useState(initialsignUpFormValues);
    //const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    //const [signUpFormValueErrors, setSignUpFormValueErrors] = useState(initialSignupFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled);
    const { user, setUser } = useContext(GlobalPropsContext);
    let navigate = useNavigate();



    // controls the form input changes via state
    const onChange = (e) => {
        setSignUpFormValues({
            ...signUpFormValues, [e.target.name]: e.target.value
        })
    }

    
    const signupSubmitHandler = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // console.log(isLoading);

        // axiosWithAuth().post('/signup', signupFormValues)
        //     .then(res => {
        //         localStorage.setItem('token', res.data.payload);
        //         console.log("signup", res);
        //         setIsLoading(false);
        //         history.push('/protected');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         <Redirect to="/signup" />
        //     })
        //if user === instructor
    }

    // ajusts `disabled` when `formValues` change
    //   useEffect(() => {
    //     schema.isValid(signupFormValues)
    //         .then(isSchemaValid => {
    //             setDisabled(!isSchemaValid) //disable the submt button if not valid
    //         })
    // }, [signupFormValues])


    //checks validation with yup, run form errors
    // yup.reach(schema, name)
    //   .validate(value)
    //   .then(() => {
    //     setFormErrors({ ...formErrors, [name]: "" })
    //   })
    //   .catch(err => {
    //     setFormErrors({ ...formErrors, [name]: err.message })
    //   })



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
                        name="phoneNumber"
                        label="phoneNumber"
                        type="text"
                        id="phoneNumber"
                        onChange={onChange}
                        value={signUpFormValues.phone}
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
                        id="password"
                        onChange={onChange}
                        value={signUpFormValues.retypePassword}
                    />
                    <button type="submit" disabled={disabled}>
                        Sign Up!
                    </button>
                </form>
                <p onClick={() => { navigate('/login') }} className="signUpFinePrintUnderForm" >
                    <span style={{display: "inline"}}>
                        Already Have An Account?...Login Here!
                    </span>
                </p>
            </div>
        </div>
    )
}


