const express = require("express");
const router = express.Router();
const { getTotalFormsStatusCount, getTodayFormsStatusCount } = require("../controllers/dashboardData.controller");
const { getpreviewformsData, getpreviewspecificformData } = require("../controllers/previewformsData.controller");


router.route('/getTotalFormsStatusCount').get(getTotalFormsStatusCount);
router.route('/getTodayFormsStatusCount').get(getTodayFormsStatusCount);

//forms fetch for preview
router.route('/getpreviewformsData').get(getpreviewformsData);
router.route('/getpreviewspecificformData').get(getpreviewspecificformData);

module.exports = router;