const express = require('express');
const districtController = require("../controllers/district")


const router = express.Router();

router.post('/add',districtController.createDistrict);
router.get('/',districtController.getDistrictData);
router.get('/:id',districtController.getSingleDistrict);
router.put('/:id',districtController.updateDistrict);
module.exports = router;