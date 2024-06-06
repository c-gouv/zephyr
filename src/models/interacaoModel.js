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
            c.*
        FROM
            curtidaPost as c
        JOIN
            post as p
                ON fkPost = idPost`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function adicionarCurtida(idPost, idUsuario) {
    var instrucaoSql = `
        INSERT INTO curtidaPost(fkPost, fkUsuario, dataHora) VALUES
            (${idPost}, ${idUsuario}, now());`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerCurtida(idPost, idUsuario) {
    var instrucaoSql = `
        DELETE FROM curtidaPost WHERE fkPost = ${idPost} AND fkUsuario = ${idUsuario};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function graphDashboard(idAutor) {
    instrucaoSql = `
    SELECT concat(DAY(i.dataHora), "/", MONTH(i.dataHora)) AS dia, COUNT(idInteracao) AS interacao
        FROM interacao AS i JOIN post AS p
            ON fkPost = idPost
    WHERE p.fkUsuario = ${idAutor}
    GROUP BY DAY(i.dataHora);`

    return database.executar(instrucaoSql);
}

function adicionarRegistroInteracao(fkAutor, fkPost, tipoInteracao) {
    instrucaoSql = `INSERT INTO interacao(fkAutor, fkPost, tipo, dataHora) values
	    (${fkAutor}, ${fkPost}, "${tipoInteracao}", now());`

    return database.executar(instrucaoSql);
}

function deletarRegistroInteracao(fkAutor, fkPost, tipoInteracao) {
    instrucaoSql = `DELETE FROM interacao WHERE fkPost = ${fkPost} AND fkAutor = ${fkAutor} AND tipo = '${tipoInteracao}';`

    return database.executar(instrucaoSql);
}

module.exports = {
    carregarComentarioPost,
    publicarComentario,
    checarCurtidaUsuario,
    adicionarCurtida,
    removerCurtida,
    graphDashboard,
    adicionarRegistroInteracao,
    deletarRegistroInteracao
}