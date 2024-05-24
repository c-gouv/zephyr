var express = require("express");
var router = express.Router();

var feedController = require("../controllers/feedController");

router.get("/listar", function (req, res) {
    feedController.listar(req, res);
});

// router.get("/pesquisar/:descricao", function (req, res) {
//     feedController.pesquisarDescricao(req, res);
// });

// router.post("/publicar/:idUsuario", function (req, res) {
//     feedController.publicar(req, res);
// });

// router.delete("/deletar/:idAviso", function (req, res) {
//     feedController.deletar(req, res);
// });

module.exports = router;