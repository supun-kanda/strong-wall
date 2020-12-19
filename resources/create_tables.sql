-- create users table
create table users
(
    user_id serial PRIMARY KEY,
    user_name VARCHAR ( 50 ) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    login_count INT default 0,
    login_state bool default false
);