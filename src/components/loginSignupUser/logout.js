import React, { useContext, useEffect } from "react";
import { GlobalPropsContext } from "../GlobalPropsContext";
import { Redirect } from "react-router-dom";
import { axiosWithAuth } from '../../utils/axiosWithAuth'

const Logout = () => {
    const { setIsLoggedIn } = useContext(GlobalPropsContext);
    useEffect(()=> {

    console.log('log out');

    setIsLoggedIn(false);
    axiosWithAuth().post('/logout')
        .then(res => {
            localStorage.removeItem('token')
            window.location.pathname = '/login'
            setIsLoggedIn(false);
            <Redirect to="/login" />

        })
        .catch(err => console.log(err))
    }, );

    return (<div></div>);
}

export default Logout;