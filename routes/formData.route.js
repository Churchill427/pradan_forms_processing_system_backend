const express = require("express");
const router = express.Router();
const {postLandformData} = require("../controllers/landformData.controller");
const {postPondformData} = require("../controllers/pondformData.controller");

router.route('/postLandformData').post(postLandformData);
router.route('/postPondformData').post(postPondformData);

module.exports = router;