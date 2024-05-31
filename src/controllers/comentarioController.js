var comentarioModel = require("../models/comentarioModel");

function publicarComentario(req, res) {
    var idPost = req.body.idPostServer;
    var usuario = req.body.usuarioServer;
    var mensagem = req.body.mensagemServer;

    comentarioModel.publicarComentario(idPost, usuario, mensagem)
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

module.exports = {
    publicarComentario
}