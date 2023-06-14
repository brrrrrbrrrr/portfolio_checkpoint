/* eslint-disable import/no-extraneous-dependencies */
const router = require("express").Router();
const multer = require("multer");
const userControllers = require("../controllers/userControllers");
const { storageUser } = require("../utils/multerUser");

const upload = multer({ storage: storageUser });

router.post("/", upload.single("picture"), userControllers.add);

module.exports = router;
