const express = require("express");
const router = express.Router();

const {getUploadUrl, getDownloadUrl} = require("../controllers/s3fileurl.controller");

router.route('/getUploadurl').get(getUploadUrl);
router.route('/getDownloadurl').get(getDownloadUrl);


module.exports = router;