-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database zephyr;
use zephyr;

create table imagem(
	idImagem int primary key auto_increment,
    imagem MEDIUMBLOB);

create table usuario(
	idUsuario int primary key auto_increment,
    nomeUsuario varchar(45) unique,
    email varchar(255) unique,
    senha varchar(45),
    fkImagem int,
    foreign key (fkImagem) references imagem(idImagem));

create table post (
	idPost int primary key auto_increment,
    fkUsuario int,
    foreign key (fkUsuario) references usuario(idUsuario),
    titulo varchar(50),
    descricao varchar(250),
    dataHora datetime,
    fkImagem int,
    foreign key (fkImagem) references imagem(idImagem));
    
create table curtidaPost (
	idCurtida int auto_increment,
    fkUsuario int,
    fkPost int,
    primary key (idCurtida, fkUsuario, fkPost),
    foreign key (fkUsuario) references usuario(idUsuario),
    foreign key (fkPost) references post(idPost),
    dataHora datetime);
    
insert into curtidaPost(fkUsuario, fkPost, dataHora) values
	(1, 14, now());
    
create table comentarioPost (
	idComentario int auto_increment,
    fkPost int,
    fkUsuario int,
    primary key	(idComentario, fkPost, fkUsuario),
    foreign key (fkPost) references post(idPost),
    foreign key (fkUsuario) references usuario(idUsuario),
    mensagem varchar(250),
    dataHora datetime);

select * from curtidaPost;
select * from comentarioPost;
select * from usuario;
select * from post;

insert into usuario(nomeUsuario, email, senha) values
	("ericoLinguicaA", "erickLinguica@gmail.comA", "abcA");

insert into post(fkUsuario, titulo, descricao) values
	(1, "banana", "iahowiahdaiwhdiuawhdiuh");
        
insert into comentarioPost(fkPost, fkUsuario, mensagem, dataHora) values
	(15, 1, "banana ao quadrado parceirinho",  '2024-05-01 22:44:58');
    
insert into curtidaPost(fkPost, fkUsuario, dataHora) values
	(15, 1, '2024-04-01 22:44:58');
    
SELECT 
    MONTH(cp.dataHora) AS mes,
    COUNT(*) AS total_curtidas
FROM 
    curtidaPost cp
JOIN
	post as p
		ON cp.fkUsuario = c.fkUsuario
WHERE
	idUsuario = 1
GROUP BY 
    MONTH(cp.dataHora);
    
SELECT MONTH(cp.dataHora) as mes, COUNT(*) as qtdCurtidas
	FROM usuario as u JOIN post as p ON p.fkUsuario = idUsuario
	JOIN curtidaPost as cp on cp.fkUsuario = idUsuario
    WHERE p.fkUsuario = 1
    GROUP BY MONTH(cp.dataHora);
    
SELECT COUNT(*) AS qtdCurtidas
    FROM usuario u JOIN post p ON p.fkUsuario = idUsuario
    JOIN curtidaPost cur ON cur.fkPost = idUsuario
    WHERE p.fkUsuario = 1
    GROUP BY MONTH(cur.dataHora);