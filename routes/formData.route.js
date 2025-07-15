const express = require("express");
const router = express.Router();
const {postLandformData} = require("../controllers/landformData.controller");
const {postPondformData} = require("../controllers/pondformData.controller");
const {postPlantationformData} = require("../controllers/plantationformData.controller");
const {updateLandformData} = require("../controllers/landformData.controller");
const {getpf_landformData} = require("../controllers/pf_landformData.contoller");
const {getpf_pondformData} = require("../controllers/pf_pondformData.controller");
const {getpf_plantationformData} = require("../controllers/pf_plantationformData.controller");
const {updatepf_landformData} = require("../controllers/pf_landformData.contoller");
const {updatepf_pondformData} = require("../controllers/pf_pondformData.controller");
const {updatepf_plantationformData} = require("../controllers/pf_plantationformData.controller");

//forms submission routes
router.route('/postLandformData').post(postLandformData);
router.route('/postPondformData').post(postPondformData);
router.route('/postPlantationformData').post(postPlantationformData);

//forms update routes
router.route('/updateLandformData').put(updateLandformData);

//fetch postfunding forms routes
router.route('/getpf_landformData').get(getpf_landformData);
router.route('/getpf_pondformData').get(getpf_pondformData);
router.route('/getpf_plantationformData').get(getpf_plantationformData);

//update postfunding forms routes
router.route('/updatepf_landformData').put(updatepf_landformData);
router.route('/updatepf_pondformData').put(updatepf_pondformData);
router.route('/updatepf_plantationformData').put(updatepf_plantationformData);

//verifier data fetch
//router.route('/getv_landformData').get();

module.exports = router;