const router = require("express").Router();
const user = require("./user.route");
const userLogin = require("./login.user.route");
const project = require("./project.route");

router.use("/user", user);
router.use("/user/login", userLogin);

router.use("/project", project);

module.exports = router;
