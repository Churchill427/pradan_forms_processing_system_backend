const express = require("express");
const router = express.Router();
const {postLandformData} = require("../controllers/landformData.controller");
const {postPondformData} = require("../controllers/pondformData.controller");
const {postPlantationformData} = require("../controllers/plantationformData.controller");

router.route('/postLandformData').post(postLandformData);
router.route('/postPondformData').post(postPondformData);
router.route('/postPlantationformData').post(postPlantationformData);

module.exports = router;