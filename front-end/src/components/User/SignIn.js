import React, { useState } from 'react';
import { login } from '../../utils/auth';

const SignIn = props => {
    const [userKey, setUserKey] = useState(null);
    const [password, setPassword] = useState(null);

    /**
     * handle login event
     * @param {Event} event event
     */
    const handleLogin = event => {
        event.preventDefault();
        if (userKey && password) {
            login({ userKey, password })
                .then(() => props.history.push('/dashboard'));
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <label>
                    User Name:
                    <input
                        type='text'
                        name='userKey'
                        value={userKey}
                        onChange={e => setUserKey(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <input type="submit" value="Sign In" />
            </form>
        </div>
    );
};

export default SignIn;
