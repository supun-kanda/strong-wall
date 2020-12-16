const environment = process.env.ENV;
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
}

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
}

module.exports = environment === 'PROD' || environment === 'DEDICATED' ? prod : nonPropd;