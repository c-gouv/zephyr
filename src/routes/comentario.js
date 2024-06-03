var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.post("/publicarComentario", function (req, res) {
    comentarioController.publicarComentario(req, res);
});
// router.get("/checarCurtidaUsuario", function (req, res) {
//     comentarioController.checarCurtidaUsuario(req, res);
// });

module.exports = router;