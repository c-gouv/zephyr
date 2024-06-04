var feedModel = require("../models/postModel");
var interacaoModel = require("../models/interacaoModel")
var postModel = require("../models/postModel")

function carregarPost(req, res) {
    var idPost = req.params.idPost;
    // var idUsuario = req.params.idUsuario;

    let comentarios = []
    // let curtidas = []

    feedModel.carregarPost(idPost)
        .then(
        async function (resultado) {
            if (resultado.length == 1) {
                await interacaoModel.carregarComentarioPost(idPost)
                    .then((resultadoComentarios) => {
                        if (resultadoComentarios.length > 0) {
                            comentarios = resultadoComentarios
                        }else{
                            comentarios = [];
                        }
                    })
                res.json({
                    postagem: resultado,
                    comentarios: comentarios
                })

            } else {
                res.status(403).send("Nenhum resultado encontrado!");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function postDashboard(req, res) {
    const fkUsuario = req.params.idUsuario
    console.log(fkUsuario)

    let curtidas = 0
    let comentarios = 0

    postModel.postDashboard(fkUsuario)
        .then(
        async function (resultado) {
            if (resultado.length > 0) {
                await postModel.kpiDashboardCurtida(fkUsuario)
                    .then((resultadoCurtida) => {
                        if (resultadoCurtida.length > 0) {
                            curtidas = resultadoCurtida
                        }
                    })
                await postModel.kpiDashboardComentario(fkUsuario)
                .then((resultadoComentario) => {
                    if (resultadoComentario.length > 0) {
                        comentarios = resultadoComentario
                    }
                })

                res.json({
                    postagem: resultado,
                    comentarios: comentarios,
                    curtidas: curtidas
                })
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function checarCurtidaUsuario(req, res) {
    const idPost = req.params.idPost
    const idUsuario = req.params.idUsuairo

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

module.exports = {
    carregarPost,
    postDashboard,
    checarCurtidaUsuario
}