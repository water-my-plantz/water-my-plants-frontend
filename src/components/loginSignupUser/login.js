
import { useContext, useState, useEffect } from "react";
// import { Navigate, } from "react-router";
// import { useNavigate } from "react-router";
import { useHistory, Redirect } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth'
import { GlobalPropsContext } from '../GlobalPropsContext'


// Initial log in form values
const initialLogInFormValues = { username: "", password: "" };


export default function Login() {
    const [loginFormValues, setLogInFormValues] = useState(initialLogInFormValues);
    const { isLoggedIn, setIsLoggedIn } = useContext(GlobalPropsContext);
    const [loginError, setLoginError] = useState(false);

    // let navigate = useNavigate();
    let history = useHistory();

    const onChange = (e) => {
        setLogInFormValues({
            ...loginFormValues, [e.target.name]: e.target.value
        })
    }


    const loginSubmitHandler = (e) => {
        e.preventDefault();

        // if (loginFormValues.username !== "user" && loginFormValues.password !== "pass") {
        //     setLoginError(true);
        // } else {
        //     setLoginError(false);
        // }

        const user = {username: loginFormValues.username, password: loginFormValues.password}

        axiosWithAuth().post('https://water-my-plants-fullstack-api.herokuapp.com/user/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.payload);
                console.log("login", res);
                history.push('/plants');
                setIsLoggedIn = true;

            })
            .catch(err => {
                console.log(err);
                <Redirect to="/login" />

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

            <p onClick={() => { history.push('/signup') }}
                className="signUpFinePrintUnderForm" >
                <span style={{ display: 'inline' }}> Brand New?  Sign Up for an account!</span>
            </p>
        </div>
    )
}

// onClick={()=> {props.setLogInFormValues()}}

// <Link to="/signup">Sign Up</Link>

