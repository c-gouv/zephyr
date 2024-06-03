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

function checarCurtidaUsuario(req, res) {
    
    
    comentarioModel.checarCurtidaUsuario().then(function (resultado) {
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
    checarCurtidaUsuario
}