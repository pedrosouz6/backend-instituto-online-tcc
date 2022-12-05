CREATE DATABASE instituto_online;
USE instituto_online;

CREATE TABLE users(
    id INT(13) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(100) NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    date DATE NOT NULL,
    office VARCHAR(100)
) DEFAULT CHARSET=utf8;

CREATE TABLE help(
    id VARCHAR(20) PRIMARY KEY not null,
    id_user INT(11) NOT NULL,
    title varchar(100) not null,
    description varchar(250) not null,
    status varchar(30) not null,
    date date not null
) DEFAULT CHARSET=utf8;

CREATE TABLE projects(
    id INT(13) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_projects VARCHAR(100) NOT NULL
) DEFAULT CHARSET=utf8;

-- Comandos para a tabela projects

INSERT INTO projects ( name_projects ) VALUES( "Balé" );
INSERT INTO projects ( name_projects ) VALUES( "Judô" );
INSERT INTO projects ( name_projects ) VALUES( "Creches comunitárias" );
INSERT INTO projects ( name_projects ) VALUES( "Horta" );