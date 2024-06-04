var database = require("../database/config");

function carregarComentarioPost(idPost) {
    var instrucaoSql = `
        SELECT 
            c.idComentario,
            c.fkPost,
            c.fkUsuario,
            c.dataHora,
            c.mensagem,
            u.idUsuario,
            u.nomeUsuario
        FROM 
            comentarioPost as c
            JOIN post as p
                ON c.fkPost = p.idPost
            JOIN usuario as u
                ON c.fkUsuario = u.idUsuario
        WHERE p.idPost = ${idPost} ORDER BY c.dataHora DESC`;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicarComentario(idPost, usuario, mensagem) {
    var instrucaoSql = `
        INSERT INTO comentarioPost(fkPost, fkUsuario, mensagem, dataHora) VALUES
            (${idPost}, ${usuario}, '${mensagem}', now());
        `;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function checarCurtidaUsuario(idPost, idUsuario) {
    var instrucaoSql = `
        SELECT
            *
        FROM
            curtidaPost
        JOIN
            post
        ON
            fkPost = ${idPost} AND fkUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    carregarComentarioPost,
    publicarComentario,
    checarCurtidaUsuario
}