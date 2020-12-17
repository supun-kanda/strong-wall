const { Router } = require('express');
const router = Router();
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const db = require('../db');
const { UPDATE_LOGOUT_STATE, GET_USER_INFO } = require('../constants/queries');
const { ENDPOINTS, DB_KEYS } = require('../constants/constants');
const { authMiddleWare } = require('../middleware');

// logout
router.post(`${ENDPOINTS.LOGOUT}`, async (req, res) => {
    try {
        await db.query(UPDATE_LOGOUT_STATE, [req.user.userId])
        return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
});

// logout
router.get(`${ENDPOINTS.USER_DATA}`, async (req, res) => {
    try {
        const rawInfo = await db.query(GET_USER_INFO, [req.user.userId])
        if (rawInfo && rawInfo.rows && rawInfo.rows.length === 1) {
            const userData = rawInfo.rows[0];
            const USER = DB_KEYS.USER;
            return res.status(StatusCodes.OK).send({
                userName: userData[USER.USER_NAME],
                userId: userData[USER.USER_ID],
                email: userData[USER.EMAIL],
                createdOn: userData[USER.CREATED_ON],
                loginCount: userData[USER.LOGIN_COUNT],
                lastLogin: userData[USER.LAST_LOGIN],
            });
        }
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
});


module.exports = router
