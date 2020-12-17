const { Router } = require('express');
const router = Router();
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const bcrypt = require('bcrypt');

const db = require('../db');
const { VALIDATE_USER, INSERT_USER, GET_USER_CREDS, UPDATE_LOGIN_STATE } = require('../constants/queries');
const { MESSAGES, ENDPOINTS } = require('../constants/constants');
const { generateAuthToken, authMiddleWare } = require('../middleware');

// validate user by user-key
router.get(`${ENDPOINTS.VALIDATE}${ENDPOINTS.ID_PARAM}`, (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: MESSAGES.USER_ID_NOT_GIVEN })
    }
    return db.query(VALIDATE_USER, [userId], (err, data) => {
        if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
        }
        if (data.rows && data.rows.length && data.rows[0]) {
            return res.status(StatusCodes.OK).send({ exists: true });
        }
        return res.status(StatusCodes.OK).send({ exists: false });
    });
});

// create user
router.post(`${ENDPOINTS.CREATE}`, async (req, res) => {
    let { userName, password, email } = req.body;
    if (!userName || !password || !email) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: MESSAGES.DATA_NOT_GIVEN })
    }
    password = await bcrypt.hash(password, 10);
    try {
        await db.query(INSERT_USER, [userName, password, email]);
        return res.status(StatusCodes.OK).send();
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
});

// login
router.post(`${ENDPOINTS.LOGIN}`, async (req, res) => {
    const { userKey, password } = req.body;
    if (!userKey || !password) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: MESSAGES.DATA_NOT_GIVEN })
    }

    try {
        const userData = await db.query(GET_USER_CREDS, [userKey]);
        // user record not exists
        if (!userData || !userData.rows || !userData.rows.length) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
        }
        // password not matching
        if (!await bcrypt.compare(password, userData.rows[0].password)) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
        }
        // token generation
        const token = generateAuthToken({
            userId: userData.rows[0].user_id,
            userName: userData.rows[0].user_name,
        })
        await db.query(UPDATE_LOGIN_STATE, [userData.rows[0].user_id]);
        return res.status(StatusCodes.OK).send({
            access_token: token,
        });
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router
