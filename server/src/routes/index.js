const { Router } = require("express");
const getDrivers = require("../controllers/getDrivers");
const getDriverById = require("../controllers/getDriverById");
const getDriverByName = require("../controllers/getDriverByName");
const postDriver = require("../controllers/postDriver");
const getTeams = require("../controllers/getTeams");

const router = Router();

router.get("/drivers", getDrivers);
router.post("/drivers", postDriver);
router.get("/teams", getTeams);
router.get("/drivers/name", getDriverByName);
router.get("/drivers/:idDriver", getDriverById);

module.exports = router;
