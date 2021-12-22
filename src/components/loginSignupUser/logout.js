import React, { useContext } from "react";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { Navigate } from "react-router";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Logout = () => {
    const { setIsLoggedIn } = useContext(GlobalPropsContext);
    console.log('log out');

    setIsLoggedIn(false);
    <Navigate to="/login" />
    axiosWithAuth().post('/logout')
        .then(res => {
            localStorage.removeItem('token')
            window.location.pathname = '/login'
            setIsLoggedIn(false);
            <Redirect to="/login" />

        })
        .catch(err => console.log(err))

    return (<div></div>);
}

export default Logout;