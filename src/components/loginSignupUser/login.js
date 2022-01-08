
import { useContext, useState, useEffect } from "react";
import { Navigate, } from "react-router";
import { useNavigate } from "react-router";
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { GlobalPropsContext } from '../GlobalPropsContext'


// Initial log in form values
const initialLogInFormValues = { username: "", password: "" };


export default function Login() {
    const [loginFormValues, setLogInFormValues] = useState(initialLogInFormValues);
    const { isLoading, setIsLoading } = useContext(GlobalPropsContext);
    const { user, setUser } = useContext(GlobalPropsContext);
    const [loginError, setLoginError] = useState(false);

    let navigate = useNavigate();

    const onChange = (e) => {
        setLogInFormValues({
            ...loginFormValues, [e.target.name]: e.target.value
        })
    }


    const loginSubmitHandler = (e) => {
        e.preventDefault();
        // setIsLoading(true);
        // console.log(isLoading);

        if (loginFormValues.username !== "user" && loginFormValues.password !== "pass") {
            setLoginError(true);
        } else {
            setLoginError(false);
        }

        axiosWithAuth().post('https://water-my-plants-fullstack-api.herokuapp.com/user/login', loginFormValues)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                console.log("login", res);
                setIsLoading(false);
                navigate.push('/plants');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <form onSubmit={loginSubmitHandler} className="form">
                <h1>Let's Get Watering!</h1>
                <input
                    placeholder="username"
                    name="username"
                    label="username"
                    type="text"
                    id="username"
                    onChange={onChange}
                    value={loginFormValues.username}
                />
                <input
                    placeholder="password"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={onChange}
                    value={loginFormValues.password}
                />
                <button type="submit">
                    LogIn
                </button>
            </form>

            {loginError && <p style={{ color: "red" }}>Username or Password does not match!</p>}

            <p onClick={() => { navigate('/signup') }}
                className="signUpFinePrintUnderForm" >
                <span style={{ display: 'inline' }}> Brand New?  Sign Up for an account!</span>
            </p>
        </div>
    )
}

// onClick={()=> {props.setLogInFormValues()}}

// <Link to="/signup">Sign Up</Link>

