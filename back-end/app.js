const express = require('express');
const { StatusCodes } = require('http-status-codes');
const { DATA, ENDPOINTS } = require('./constants/constants');
const { DEDICATED, PORT } = require('./configurations');
const db = require('./db');
const { authMiddleWare } = require('./middleware');
const userRoute = require('./routes/user');
const permittedUserRoute = require('./routes/permittedUser');
const { DB_CHECK } = require('./constants/queries');
const cors = require('cors');
const app = express();

// Reference: https://rules.sonarsource.com/javascript/tag/cwe/RSPEC-5689
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

console.log(`The environment is ${DEDICATED ? 'Prod' : 'Non Prod'}`);

// health checks
app.get(ENDPOINTS.HEALTH_CHECK, (_, res) => res.status(StatusCodes.OK).json(DATA.HEALTHY_RESPONSE));
app.get(ENDPOINTS.DB_CHECK, (req, res, next) => {
    db.query(DB_CHECK, (err, data) => {
        if (err) {
            return next(err);
        }
        return res.send(data.rows[0]);
    })
});

// not-authorized endpoints
app.use(ENDPOINTS.USER, userRoute);

// check for auth
app.use(authMiddleWare);

// authorized endpoints
app.get(ENDPOINTS.AUTH_CHECK, (_, res) => res.status(StatusCodes.OK).json(DATA.HEALTHY_RESPONSE));
app.use(ENDPOINTS.USER, permittedUserRoute);

// app
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
