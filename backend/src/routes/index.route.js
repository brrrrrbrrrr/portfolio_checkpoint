const router = require("express").Router();
const user = require("./user.route");
const userLogin = require("./login.user.route");
const project = require("./project.route");
const type = require("./type.route");
const tech = require("./tech.route");

router.use("/user", user);
router.use("/user/login", userLogin);
router.use("/type", type);
router.use("/project", project);
router.use("/tech", tech);

module.exports = router;
