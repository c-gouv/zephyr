var express = require("express");
var router = express.Router();

var interacaoController = require("../controllers/interacaoController");

router.post("/publicarComentario", function (req, res) {
    interacaoController.publicarComentario(req, res);
});
router.get("/checarCurtidaUsuario/:idPost/:idUsuario", function (req, res) {
    interacaoController.checarCurtidaUsuario(req, res);
});
router.post("/adicionarCurtida", function (req, res) {
    interacaoController.adicionarCurtida(req, res);
});

router.delete("/removerCurtida", function (req, res) {
    interacaoController.removerCurtida(req, res);
});


module.exports = router;