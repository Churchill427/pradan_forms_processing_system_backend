const {authUser, changePassword} = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.route('/authUser').post(authUser);
router.route('/changePassword').post(changePassword);

module.exports = router;