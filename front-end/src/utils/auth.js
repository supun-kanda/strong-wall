import { TOKEN_KEY, ENDPOINTS, METHODS } from "../constants/constants";
import request from "./request";

/**
 * Login action
 * @param {Object} credentials creds eg: {userKey:'a',password:'b'}
 * @returns {Promise}
 */
export const login = credentials =>
    request(ENDPOINTS.LOGIN, null, METHODS.POST, credentials)
        .then(data => {
            localStorage.setItem(TOKEN_KEY, data['access_token']);
        })
        .catch(err => {
            localStorage.removeItem(TOKEN_KEY);
            alert('login failed: ' + err);
        });

/**
 * Sign up action
 * @param {Object} info user info {userName:'a',password:'b',email:'c@d.com'}
 * @returns {Promise}
 */
export const signUp = info => request(ENDPOINTS.SIGN_UP, null, METHODS.POST, info);

/**
 * Logout action
 * @returns {Promise}
 */
export const logout = () =>
    request(ENDPOINTS.LOGOUT, localStorage.getItem(TOKEN_KEY), METHODS.POST)
        .finally(() => localStorage.removeItem(TOKEN_KEY));

/**
 * Gives whther the user is logged in
 * @returns {Boolean} whether the user logged in
 */
export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}
