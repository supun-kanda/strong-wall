import React, { useState } from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import '../../styles/styles.scss';

const UserPortal = props => {
    const [isLoginShown, setLoginShown] = useState(true);

    /**
     * Change the component to be shown by a child
     * @param {Boolean} val value to be swapped
     */
    const swapComponent = val => setLoginShown(val);
    return (
        <div className='auth'>
            {isLoginShown ? <SignIn {...props} /> : <SignUp swap={swapComponent} {...props} />}
            <button
                onClick={() => setLoginShown(!isLoginShown)}
            >
                {isLoginShown ? 'Sign Up' : 'Back to Sign In'}
            </button>
        </div>
    );
};

export default UserPortal;
