CREATE DATABASE instituto_online;
USE instituto_online;

CREATE TABLE users(
    id INT(13) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(32) NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    date DATE NOT NULL,
    office VARCHAR(100)
) DEFAULT CHARSET=utf8;

CREATE TABLE help(
	id int PRIMARY KEY not null,
    description varchar(200) not null,
    status varchar(30) not null,
    date date not null
) DEFAULT CHARSET=utf8;