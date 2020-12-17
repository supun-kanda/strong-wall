module.exports = {
    DB_CHECK: 'select now()',
    VALIDATE_USER: 'select 1 from users where user_name = $1 or email = $1',
    INSERT_USER: 'insert into users (user_name, password, email, created_on) values ($1, $2, $3, now())',
    GET_USER_CREDS: 'select user_id, user_name, password from users where user_name = $1 or email = $1',
    IS_USER_LOGGED_IN: 'select login_state from users where user_id = $1',
    UPDATE_LOGIN_STATE: 'update users set login_state = true, last_login = now(), login_count = login_count + 1 where user_id = $1',
    UPDATE_LOGOUT_STATE: 'update users set login_state = false where user_id = $1',
    GET_USER_INFO: 'select user_name, user_id, email, created_on, login_count, last_login from users u where user_id = $1',
}
