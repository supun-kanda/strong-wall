const express = require('express');
const { DATA, ENDPOINTS } = require('./constants');
const { DEDICATED, PORT } = require('./configurations');
const db = require('./db');

const app = express();

console.log(`The environment is ${DEDICATED ? 'Prod' : 'Non Prod'}`);

// health checks
app.get(ENDPOINTS.HEALTH_CHECK, (_, res) => res.status(200).json(DATA.HEALTH_RESPONSE));
app.get(ENDPOINTS.DB_CHECK, (req, res, next) => {
    db.query('SELECT NOW()', (err, data) => {
        if (err) {
            return next(err)
        }
        res.send(data.rows[0])
    })
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
