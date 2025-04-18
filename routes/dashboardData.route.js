const express = require("express");
const router = express.Router();
const { getTotalFormsStatusCount, getTodayFormsStatusCount } = require("../controllers/dashboardData.controller");


router.route('/getTotalFormsStatusCount/:userId').get(getTotalFormsStatusCount);
router.route('/getTodayFormsStatusCount/:userId').get(getTodayFormsStatusCount);

module.exports = router;