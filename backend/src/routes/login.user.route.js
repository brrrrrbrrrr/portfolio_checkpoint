const router = require("express").Router();
const { verifyPassword } = require("../utils/auth");
const userControllers = require("../controllers/userControllers");

router.post("/", userControllers.getUserByLoginToNext, verifyPassword);

module.exports = router;
