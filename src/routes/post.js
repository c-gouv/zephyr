var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/carregarPost/:idPost/:idUsuario", function (req, res) {
    postController.carregarPost(req, res);
});
router.get("/postDashboard/:idUsuario", function (req, res) {
    postController.postDashboard(req, res);
});
router.get("/checarCurtidaUsuario/:idPost/:idUsuario", function (req, res) {
    postController.checarCurtidaUsuario(req, res);
});

module.exports = router;