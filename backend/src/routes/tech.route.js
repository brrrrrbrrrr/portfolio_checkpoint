const router = require("express").Router();
const techControllers = require("../controllers/techControllers");
const { verifyToken } = require("../utils/auth");

router.get("/:id", verifyToken, techControllers.browseTech);

router.get("/", techControllers.browse);

module.exports = router;
