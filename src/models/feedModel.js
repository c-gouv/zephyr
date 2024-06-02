var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            p.idPost,
            p.dataHora,
            p.titulo,
            p.descricao,
            p.fkUsuario,
            u.idUsuario,
            u.nomeUsuario,
            (SELECT COALESCE(count(idComentario)) FROM comentarioPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdComentarios,
            COALESCE(p.curtida, 0) as qtdCurtidas
        FROM post p
            JOIN usuario u
                ON p.fkUsuario = u.idUsuario
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorPerfil(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT 
            p.idPost,
            p.dataHora,
            p.titulo,
            p.descricao,
            p.fkUsuario,
            u.idUsuario,
            u.nomeUsuario,
            (SELECT COALESCE(count(idComentario)) FROM comentarioPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdComentarios,
            COALESCE(p.curtida, 0) as qtdCurtidas
        FROM post p
            JOIN usuario u
                ON p.fkUsuario = u.idUsuario
        WHERE idUsuario = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function publicar(titulo, descricao, idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", titulo, descricao, idUsuario);
    var instrucaoSql = `
        INSERT INTO post(fkUsuario, titulo, descricao, dataHora) values (${idUsuario},'${titulo}', '${descricao}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPost(idPost) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPost);
    var instrucaoSql = `
        DELETE FROM post WHERE idPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarTodosComentario(idPost) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPost);
    var instrucaoSql = `
        DELETE FROM comentarioPost WHERE fkPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    publicar,
    listarPorPerfil,
    deletarPost,
    deletarTodosComentario
}
