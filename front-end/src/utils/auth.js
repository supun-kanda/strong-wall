import { TOKEN_KEY, ENDPOINTS, METHODS } from "../constants/constants";
import request from "./request";

export const login = credentials =>
    request(ENDPOINTS.LOGIN, null, METHODS.POST, credentials)
        .then(data => {
            localStorage.setItem(TOKEN_KEY, data['access_token']);
        })
        .catch(err => {
            localStorage.removeItem(TOKEN_KEY);
            alert('login failed: ' + JSON.stringify(err));
        });

export const logout = () =>
    request(ENDPOINTS.LOGOUT, localStorage.getItem(TOKEN_KEY), METHODS.POST)
        .finally(() => localStorage.removeItem(TOKEN_KEY));

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}
