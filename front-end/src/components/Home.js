import React, { useState } from 'react';
import { logout, isLogin } from '../utils/auth';
import { Link } from 'react-router-dom';
import { URIs } from "../constants/constants";

export default function Home() {
    const [isLoggedIn, setLoggedIn] = useState(isLogin());
    const handleLogout = () => {
        logout();
        setLoggedIn(false);
    }
    return (
        <div>
            <h1>Home</h1>

            {isLoggedIn ?
                <button onClick={() => handleLogout()}>Click here to log out</button>
                : <Link to={URIs.AUTH}>Go to sign in page</Link>
            }
        </div>
    );
}
