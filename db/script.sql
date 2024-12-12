CREATE TABLE users (
    username CHARACTER varying(20) NOT NULL,
    id BIGSERIAL NOT NULL primary key,
    email CHARACTER varying(255) NOT NULL,
    fullname CHARACTER varying(70) NOT NULL,
    password CHARACTER varying(255),
    balance BIGINT DEFAULT 0
);