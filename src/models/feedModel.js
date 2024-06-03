var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT 
            p.idPost,
            p.dataHora,
            p.titulo,
            p.descricao,
            p.fkUsuario,
            u.nomeUsuario,
            (SELECT COALESCE(count(idComentario)) FROM comentarioPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdComentarios,
            (SELECT COALESCE(count(idCurtida), 0) FROM curtidaPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdCurtidas
        FROM post p
            JOIN usuario u
                ON p.fkUsuario = u.idUsuario
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorPerfil(idUsuario) {
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
    var instrucaoSql = `
        INSERT INTO post(fkUsuario, titulo, descricao, dataHora) values (${idUsuario},'${titulo}', '${descricao}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarPost(idPost) {
    var instrucaoSql = `
        DELETE FROM post WHERE idPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarTodosComentario(idPost) {
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
