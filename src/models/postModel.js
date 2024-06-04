var database = require("../database/config");

function carregarPost(idPost) {
    var instrucaoSql = `
        SELECT 
            p.idPost,
            p.titulo,
            p.descricao,
            p.dataHora,
            u.nomeUsuario,
            (SELECT COALESCE(count(idComentario), 0) FROM comentarioPost JOIN post ON fkPost = idPost WHERE fkPost = p.idPost) as qtdComentarios,
            COALESCE((SELECT count(idCurtida) FROM curtidaPost WHERE fkPost = p.idPost), 0) as qtdCurtidas
        FROM post p
            INNER JOIN usuario u
                ON p.fkUsuario = u.idUsuario
        WHERE idPost = ${idPost};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postDashboard(fkUsuario) {
    var instrucaoSql = `
    SELECT
        p.idPost,
        p.dataHora,
        p.titulo,
        p.descricao,
        p.fkUsuario,
        u.nomeUsuario,
        COALESCE((SELECT count(idComentario) FROM comentarioPost WHERE fkPost = p.idPost), 0) as qtdComentarios,
        COALESCE((SELECT count(idCurtida) FROM curtidaPost WHERE fkPost = p.idPost), 0) as qtdCurtidas,
        (COALESCE((SELECT count(idComentario) FROM comentarioPost WHERE fkPost = p.idPost), 0) + 
        COALESCE((SELECT count(idCurtida) FROM curtidaPost WHERE fkPost = p.idPost), 0)) as totalEngajamento
    FROM post p
        JOIN usuario u
            ON p.fkUsuario = u.idUsuario
    WHERE p.fkUsuario = ${fkUsuario}
        ORDER BY totalEngajamento DESC LIMIT 1;`

        return database.executar(instrucaoSql);
}

function kpiDashboardCurtida(fkUsuario) {
    var instrucaoSql = `
    SELECT
        COUNT(*) AS qtdCurtidas
    FROM curtidaPost AS cur
        JOIN post AS p
            ON cur.fkPost = p.idPost
    WHERE p.fkUsuario = ${fkUsuario};`

    return database.executar(instrucaoSql);
}

function kpiDashboardComentario(fkUsuario) {
    var instrucaoSql = `
    SELECT
        COUNT(*) AS qtdComentarios
    FROM comentarioPost AS com
        JOIN post AS p
            ON com.fkPost = p.idPost
    WHERE p.fkUsuario = ${fkUsuario};`

    return database.executar(instrucaoSql);
}

module.exports = {
    carregarPost,
    postDashboard,
    kpiDashboardCurtida,
    kpiDashboardComentario
}
