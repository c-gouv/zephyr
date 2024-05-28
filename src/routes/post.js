var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/carregarPost/:idPost/:idUsuario", function (req, res) {
    postController.carregarPost(req, res);
});

module.exports = router;