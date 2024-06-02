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
    curtida int,
    fkImagem int,
    foreign key (fkImagem) references imagem(idImagem));
    
create table comentarioPost (
	idComentario int auto_increment,
    fkPost int,
    fkUsuario int,
    primary key	(idComentario, fkPost, fkUsuario),
    foreign key (fkPost) references post(idPost),
    foreign key (fkUsuario) references usuario(idUsuario),
    mensagem varchar(250),
    dataHora datetime);
    
select * from comentarioPost;
select * from usuario;
select * from post;
truncate comentarioPost;
truncate post;
insert into usuario(usuario, email, senha) values
	("ericoLinguica", "erickLinguica@gmail.com", "abc");

insert into post(fkUsuario, titulo, descricao) values
	(1, "banana", "iahowiahdaiwhdiuawhdiuh");
        
insert into comentarioPost(fkPost, fkUsuario, mensagem, dataHora) values
	(1, 1, "banana ao quadrado parceirinho", now());