/* eslint-disable import/no-extraneous-dependencies */
const router = require("express").Router();
const multer = require("multer");
const userControllers = require("../controllers/userControllers");
const { storageUser } = require("../utils/multerUser");
const { verifyToken } = require("../utils/auth");

const upload = multer({ storage: storageUser });

router.get("/visit", userControllers.browse);
router.put("/", verifyToken, userControllers.updateUser);
router.get("/", verifyToken, userControllers.read);
router.post("/", upload.single("picture"), userControllers.add);

module.exports = router;
