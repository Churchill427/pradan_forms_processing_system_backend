const {authUser, changePassword} = require("../controllers/users.controller");
const { getUserData } = require("../controllers/usersData.controller");
const express = require("express");
const router = express.Router();

router.route('/authUser').post(authUser);
router.route('/changePassword').put(changePassword);
router.route('/getUserData/:username').get(getUserData);

module.exports = router;