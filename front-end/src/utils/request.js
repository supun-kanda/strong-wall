import configs from "../configurations";

export default function request(endpoint, token, method, body) {
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }
    if (method) {
        options.method = method;
    }
    if (body) {
        options.body = JSON.stringify(body);
    }
    return fetch(configs.API_URL + endpoint, options)
        .then(response => {
            if (response.status >= 200 && response.status < 400) {
                return response.json()
            }
            throw new Error(`Response status:${response.status}`);
        });
}
