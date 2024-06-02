var express = require("express");
var router = express.Router();

var feedController = require("../controllers/feedController");

router.get("/listar", function (req, res) {
    feedController.listar(req, res);
});

router.get("/listarPorPerfil/:idUsuario", function (req, res) {
    feedController.listarPorPerfil(req, res);
});

router.post("/publicar/:idUsuario", function (req, res) {
    feedController.publicar(req, res);
});

router.delete("/deletarPost/:idPost", function (req, res) {
    feedController.deletarPost(req, res);
});

module.exports = router;