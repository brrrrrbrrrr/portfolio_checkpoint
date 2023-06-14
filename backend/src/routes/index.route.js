const router = require("express").Router();
const user = require("./user.route");

router.use("/user", user);

module.exports = router;
