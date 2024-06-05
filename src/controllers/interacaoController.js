var interacaoModel = require("../models/interacaoModel");

function publicarComentario(req, res) {
    var idPost = req.body.idPostServer;
    var usuario = req.body.usuarioServer;
    var mensagem = req.body.mensagemServer;

    interacaoModel.publicarComentario(idPost, usuario, mensagem)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function checarCurtidaUsuario(req, res) {
    const idPost = req.params.idPost
    const idUsuario = req.params.idUsuario

    interacaoModel.checarCurtidaUsuario(idPost, idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function adicionarCurtida(req, res) {
    const idPost = req.body.idPost
    const idUsuario = req.body.idUsuario

    interacaoModel.adicionarCurtida(idPost, idUsuario)
        .then(
            function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function removerCurtida(req, res) {
    const idPost = req.body.idPost
    const idUsuario = req.body.idUsuario

    interacaoModel.removerCurtida(idPost, idUsuario)
        .then(
            function (resultado) {
            res.status(200).json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    publicarComentario,
    checarCurtidaUsuario,
    adicionarCurtida,
    removerCurtida
}