import React, { useContext, useEffect } from "react";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { Redirect } from "react-router-dom";


const Logout = () => {
    const { setIsLoggedIn } = useContext(GlobalPropsContext);


    useEffect(()=> {
    console.log('log out');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.pathname = '/';
    setIsLoggedIn(false);
    <Redirect to="/" />;
    }, );

    return (<div></div>);
}
export default Logout;