const router = require("express").Router();
const user = require("./user.route");
const userLogin = require("./login.user.route");

router.use("/user", user);
router.use("/user/login", userLogin);

module.exports = router;
