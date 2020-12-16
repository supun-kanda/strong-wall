const { randomBytes } = require('crypto');
const secret = randomBytes(64).toString('hex');

const environment = process.env.ENV;

// environment: prod
const prod = {
    DEDICATED: true,
    DB: {
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT || 5432,
    },
    PORT: process.env.PGPORT || 8080,
    AUTH: {
        SECRET: process.env.AUTH_SECRET || secret,
        EXPIRES_IN: process.env.EXPIRES_IN || 1800,
    },
}

// environment: local
const nonPropd = {
    DEDICATED: false,
    DB: {
        host: 'localhost',
        database: 'strongwall',
        user: 'user',
        password: 'pass',
        port: 5432,
    },
    PORT: 8080,
    AUTH: {
        SECRET: secret,
        EXPIRES_IN: 1800, // in seconds
    },
}

module.exports = environment === 'PROD' || environment === 'DEDICATED' ? prod : nonPropd;
