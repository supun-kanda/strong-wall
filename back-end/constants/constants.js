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
        USER_DATA: '/userData',
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

    DB_KEYS: {
        USER: {
            USER_NAME: 'user_name',
            USER_ID: 'user_id',
            EMAIL: 'email',
            PASSWORD: 'password',
            CREATED_ON: 'created_on',
            LAST_LOGIN: 'last_login',
            LOGIN_COUNT: 'login_count',
            LOGIN_STATE: 'login_state',
        }
    },
}
