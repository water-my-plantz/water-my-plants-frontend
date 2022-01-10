// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// // this is going to a few things
// // 1. wrap the plain Route component and pass the props through
// // 2. check to see if the user is logged in, if yes, render component
// // 3. if user is not logged in, we Navigate to login

// const PrivateRoute = ({ element: Element, ...rest }) => {
//     return (<Route {...rest} render={
//         (props) => {
//             if (localStorage.getItem('token')) {
//                 return <Element {...props} />
//             } else {
//                 return <Navigate to='/login' />
//             }
//         }
//     } />)
// }

// export default PrivateRoute;