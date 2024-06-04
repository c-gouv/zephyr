var express = require("express");
var router = express.Router();

var interacaoController = require("../controllers/interacaoController");

router.post("/publicarComentario", function (req, res) {
    interacaoController.publicarComentario(req, res);
});
// router.get("/checarCurtidaUsuario", function (req, res) {
//     interacaoController.checarCurtidaUsuario(req, res);
// });

module.exports = router;