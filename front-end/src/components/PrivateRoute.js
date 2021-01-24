import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/auth';
import { URIs } from "../constants/constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to auth page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to={URIs.AUTH} />
        )} />
    );
};

export default PrivateRoute;
