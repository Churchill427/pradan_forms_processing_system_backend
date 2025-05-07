const express = require("express");
const router = express.Router();
const {postLandformData} = require("../controllers/landformData.controller");

router.route('/postLandformData').post(postLandformData);

module.exports = router;