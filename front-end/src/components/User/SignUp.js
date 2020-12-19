import React, { useState } from 'react';
import { signUp } from '../../utils/auth';

const SignUp = props => {
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [isPasswordsValid, setPasswordsValid] = useState(false);
    const { swap } = props;

    /**
     * handle signup event
     * @param {Event} event event
     */
    const handleSignUp = event => {
        event.preventDefault();
        if (userName && password && email) {
            if (!isPasswordsValid) {
                return alert("The passwords are not matched");
            }
            return signUp({ userName, password, email })
                .then(() => swap(true))
                .then(() => alert('Sign Up successful'))
                .catch(err => alert(`Sign Up Failed: ${err}`))
        }
        return alert("All inputs have to be given");
    }

    /**
     * Handle password blurring
     * @param {Event} event event
     */
    const onPasswordBlur = event => {
        if (event.target.value !== password) {
            alert("The passwords are not matched");
            setPasswordsValid(false);
        } else {
            setPasswordsValid(true);
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    User Name:
                    <input
                        type='text'
                        name='userName'
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
                <label>
                    Confirm Password:
                    <input
                        type='password'
                        name='password'
                        onBlur={onPasswordBlur}
                    />
                </label>
                <br />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default SignUp;
