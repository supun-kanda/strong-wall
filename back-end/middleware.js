// Reference: https://levelup.gitconnected.com/tutorial-for-authentication-and-authorization-in-a-node-application-772bef191dae

const jwt = require('jsonwebtoken');
const { AUTH } = require('./configurations');
const db = require('./db');
const {
    ReasonPhrases,
    StatusCodes,
} = require('http-status-codes');
const { IS_USER_LOGGED_IN } = require('./constants/queries');

/**
 * authentication checker
 * @param {Request} req request
 * @param {Response} res response
 * @param {Function} next callback
 */
const authMiddleWare = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
        }

        const token = authorization.replace('Bearer ', '');
        const data = await jwt.verify(token, AUTH.SECRET);
        if (!data.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
        }

        const loggedInStatus = await db.query(IS_USER_LOGGED_IN, [data.userId]);
        if (!loggedInStatus || !loggedInStatus.rows || !loggedInStatus.rows.length || !loggedInStatus.rows[0].login_state) {
            return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
        }
        req.user = { ...data };

        return next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
}

/**
 * generate authentication token
 * @param {Object} user user object
 * @returns {String} jwt token
 */
const generateAuthToken = user => jwt.sign({
    ...user,
    isAdmin: user.role === 'admin'
}, AUTH.SECRET, { expiresIn: AUTH.EXPIRES_IN });

module.exports = { authMiddleWare, generateAuthToken };
