CREATE DATABASE instituto_online;
USE instituto_online;

CREATE TABLE users(
    id INT(13) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(32) NOT NULL,
    telephone VARCHAR(13) NOT NULL,
    date DATE NOT NULL
) DEFAULT CHARSET=utf8;