const router = require("express").Router();
const typeControllers = require("../controllers/typeControllers");

router.get("/", typeControllers.browse);
module.exports = router;
