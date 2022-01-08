import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({element:Component, ...rest})=> {
    return <Route {...rest} render={(props)=> {
        if (localStorage.getItem("token")) {
            return <Component {...props}/>
        } else {
            return auth ? <Outlet /> : <Navigate to="/login" />;
        }
        
    }}/>
}

export default PrivateRoute;