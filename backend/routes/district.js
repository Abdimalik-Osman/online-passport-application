const express = require('express');
const districtController = require("../controllers/district")


const router = express.Router();

router.post('/add',districtController.createDistrict);
router.get('/all',districtController.getDistrictData);
router.get('/single/:id',districtController.getSingleDistrict);

router.get('/state/single/:id',districtController.getStateData);
router.get('/state/single/data/info/:id',districtController.getDistrictInfo);
router.patch('/:id',districtController.updateDistrict);
module.exports = router;