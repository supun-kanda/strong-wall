const environment = process.env.ENV;

// environment: prod
const prod = {
    DEDICATED: true,
    PORT: process.env.FE_PORT || 3000,
    API_URL: process.env.API_URL,
};

// environment: local
const nonPropd = {
    DEDICATED: true,
    PORT: 3000,
    API_URL: 'http://localhost:8080',
};

export default environment === 'PROD' || environment === 'DEDICATED' ? prod : nonPropd;
