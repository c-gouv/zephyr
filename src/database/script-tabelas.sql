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
	(1, 1, "banana ao quadrado parceirinho", now());
    
insert into curtidaPost(fkPost, fkUsuario, dataHora) values
	(16, 5, now());

SELECT
	count(cur.fkUsuario)
    FROM curtidaPost as cur
        JOIN usuario as u ON cur.fkUsuario = u.idUsuario
        JOIN post as p on p.fkUsuario = u.idUsuario
        JOIN comentarioPost as com on com.fkPost = p.idPost
        WHERE YEAR(cur.dataHora) = YEAR(CURRENT_DATE()) AND WEEK(cur.dataHora) = WEEK(CURRENT_DATE()) AND cur.fkUsuario = 1
        GROUP BY cur.fkUsuario, cur.dataHora;
        
        
SELECT
    count(cur.idCurtida) AS total_curtidas
FROM
    curtidaPost AS cur
    JOIN usuario AS u ON cur.fkUsuario = u.idUsuario
    JOIN post AS p ON p.idPost = cur.fkPost
WHERE
    YEAR(cur.dataHora) = YEAR(CURRENT_DATE())
    AND WEEK(cur.dataHora) = WEEK(CURRENT_DATE())
    AND u.idUsuario = 1;
        
SELECT
	(SELECT COUNT(*) from curtidaPost as cur join post as p on cur.fkPost = p.idPost) AS qtdCurtidas,
	(SELECT COUNT(*) from comentarioPost as com join post as p on com.fkPost = p.idPost) AS qtdComentarios
FROM
	curtidaPost AS cur
JOIN post AS p
	ON cur.fkPost = p.idPost
JOIN comentarioPost AS com
	ON com.fkPost = p.idPost
WHERE YEAR(cur.dataHora) = YEAR(CURRENT_DATE()) AND WEEK(cur.dataHora) = WEEK(CURRENT_DATE()) AND p.fkUsuario = 1;

SELECT COUNT(*) AS qtdCurtidas
FROM curtidaPost AS cur
JOIN post AS p ON cur.fkPost = p.idPost
WHERE p.fkUsuario = 1;

SELECT COUNT(*) AS qtdComentarios
FROM comentarioPost AS com
JOIN post AS p ON com.fkPost = p.idPost
WHERE p.fkUsuario = 1;
        
-- WHERE YEAR(c.dataHora) = YEAR(CURRENT_DATE()) AND WEEK(c.dataHora) = WEEK(CURRENT_DATE()) AND c.fkUsuario = 1