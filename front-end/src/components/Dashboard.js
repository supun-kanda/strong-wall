import React, { useEffect, useState } from 'react';
import request from "../utils/request";
import { logout } from "../utils/auth";
import { ENDPOINTS, TOKEN_KEY, METHODS, URIs } from "../constants/constants";

const Dashboard = props => {
    const [userData, setUserData] = useState({});

    const handleLogout = () =>
        logout()
            .finally(() => props.history.push(URIs.AUTH));

    // Reference: https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        if (userData && !Object.keys(userData).length) {
            request(ENDPOINTS.USER_DATA, localStorage.getItem(TOKEN_KEY), METHODS.GET)
                .then(data => setUserData(data));
        }
    });
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li>User ID: {userData.userId}</li>
                <li>User Name: {userData.userName}</li>
                <li>Email: {userData.email}</li>
                <li>Started: {userData.createdOn}</li>
                <li>Last Visited: {userData.lastLogin}</li>
                <li>Login Count: {userData.loginCount}</li>
            </ul>

            <button onClick={() => handleLogout()}>Click here to log out</button>
        </div>);
}
export default Dashboard;
