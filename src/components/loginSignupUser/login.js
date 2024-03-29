import { useContext, useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { GlobalPropsContext } from "../GlobalPropsContext";

// Initial log in form values
const initialLogInFormValues = { username: "", password: "" };

export default function Login() {
    const [loginFormValues, setLogInFormValues] = useState(
        initialLogInFormValues
    );
    const { isLoggedIn, setIsLoggedIn } =
        useContext(GlobalPropsContext);
    const [loginError, setLoginError] = useState(false);

    let history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            history.push("/plants");
        }
    }, [isLoggedIn]);

    const onChange = (e) => {
        setLogInFormValues({
            ...loginFormValues,
            [e.target.name]: e.target.value,
        });
    };

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        const user = {
            username: loginFormValues.username,
            password: loginFormValues.password,
        };

        axiosWithAuth()
            .post(
                "https://water-my-plants-fullstack-api.herokuapp.com/user/login",
                user
            )
            .then((res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", res.data.username);
                localStorage.setItem("id", res.data.id);
                console.log("login", res);
                history.push("/plants");
                setIsLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid username or password");
            });
    };

    return (
        <div>
            <form onSubmit={loginSubmitHandler} className="form">
                <h2 class="sign-in">Welcome Back!</h2>
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
                <button className='login' type="submit">LOG IN</button>
            </form>

            {loginError && (
                <p style={{ color: "red" }}>
                    Username or Password does not match!
                </p>
            )}

            <p
                onClick={() => {
                    history.push("/signup");
                }}
                className="signUpFinePrintUnderForm"
            >
                <a className="sign-up-for-an-account">
                    Brand New? Sign Up for an account!
                </a>
            </p>
        </div>
    );
}
