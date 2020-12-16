module.exports = {

    ENDPOINTS: {
        HEALTH_CHECK: '/health',
        DB_CHECK: '/dbCheck',
        AUTH_CHECK: '/authCheck',
        USER: '/user',
        VALIDATE: '/validate',
        ID_PARAM: '/:id',
        CREATE: '/create',
        LOGIN: '/login',
        LOGOUT: '/logout',
    },

    DATA: {
        HEALTHY_RESPONSE: {
            success: true,
        },
    },

    MESSAGES: {
        USER_ID_NOT_GIVEN: 'user_id is not given',
        DATA_NOT_GIVEN: 'data not given',
    },
}
