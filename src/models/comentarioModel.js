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
            u.usuario
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

module.exports = {
    carregarComentarioPost
}