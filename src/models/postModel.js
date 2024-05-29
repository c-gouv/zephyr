var database = require("../database/config");

function carregarPost() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            p.idPost,
            p.titulo,
            p.descricao,
            u.usuario,
            (SELECT COALESCE(count(idComentario), 0) FROM comentarioPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdComentarios,
            COALESCE(p.curtida, 0) as qtdCurtidas
        FROM post p
            INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    carregarPost
}
