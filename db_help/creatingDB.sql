DROP DATABASE IF EXISTS db_help;
CREATE DATABASE db_help;
USE db_help;

CREATE TABLE tb_serviceKinds (
	id_kind INT AUTO_INCREMENT,
	kindName VARCHAR(20) NOT NULL,
	image VARCHAR(100) NOT NULL,
	PRIMARY KEY(id_kind)
);

INSERT INTO tb_serviceKinds VALUES
(0, 'Limpeza Doméstica', 'limpeza.svg'),
(0, 'Eletricidade', 'eletricidade.svg'),
(0, 'Encanamento', 'encanamento.svg'),
(0, 'Cuidados Pessoais', 'cuidados.svg'),
(0, 'Pintura', 'pintura.svg'),
(0, 'Mecânica', 'mecanica.svg'),
(0, 'Obras', 'obras.svg'),
(0, 'Outros', 'outros.svg');


CREATE TABLE tb_people(
	document VARCHAR(14),
	provider TINYINT(1) NOT NULL,
	name VARCHAR(100) NOT NULL,
	telephone VARCHAR(14) NOT NULL,
	city VARCHAR(30) NOT NULL,
	uf VARCHAR(2) NOT NULL,
	latitude VARCHAR(40),
	longitude VARCHAR(40),
	service_id INT NOT NULL,
	description VARCHAR(100) NOT NULL,
	image VARCHAR(100) NOT NULL,
	email VARCHAR(40) NOT NULL,
	PRIMARY KEY(document)
);

ALTER TABLE tb_people
ADD CONSTRAINT FK_People_Service
FOREIGN KEY (service_id) REFERENCES tb_serviceKinds(id_kind);