const router = require("express").Router();
const projectControllers = require("../controllers/projectControllers");
const { verifyToken } = require("../utils/auth");

router.get("/visit/:id", projectControllers.browseVisit);
router.get("/visit/:id/:projectId", projectControllers.readVisit);
router.put("/:id/tech", verifyToken, projectControllers.updateTech);
router.get("/", verifyToken, projectControllers.browse);
router.get("/:id", verifyToken, projectControllers.read);
router.post("/", verifyToken, projectControllers.add);
router.put("/:id", verifyToken, projectControllers.updateProject);
router.delete("/:id", verifyToken, projectControllers.destroy);
module.exports = router;
