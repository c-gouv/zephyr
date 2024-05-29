var feedModel = require("../models/postModel");
var comentarioModel = require("../models/comentarioModel")

function carregarPost(req, res) {
    var idPost = req.params.idPost;
    // var idUsuario = req.params.idUsuario;

    let comentarios = []
    // let curtidas = []

    feedModel.carregarPost(idPost)
        .then(
        async function (resultado) {
            if (resultado.length == 1) {
                await comentarioModel.carregarComentarioPost(idPost)
                    .then((resultadoComentarios) => {
                        if (resultadoComentarios.length > 0) {
                            comentarios = resultadoComentarios
                        }else{
                            comentarios = [];
                        }
                    })
                // await curtidaModel.buscarCurtidaPorPostagemAndUsuario(idPostagem, idUsuario)
                //     .then(resultadoCurtida => {
                //         if (resultadoCurtida.length == 1) {
                //             curtidas = resultadoCurtida
                //         } else {
                //             curtidas = []
                //         }
                //     })
                
                res.json({
                    postagem: resultado,
                    // curtidas: curtidas,
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

module.exports = {
    carregarPost
}