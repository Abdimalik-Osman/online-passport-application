const express = require('express');
const districtHolydayController = require("../controllers/districtHolyday")


const router = express.Router();

router.post('/add',districtHolydayController.createHolyday);
router.get('/all',districtHolydayController.getDistrictHolydays);
router.get('/:id',districtHolydayController.getSingleDistrictHolydays);
router.patch('/update/:id',districtHolydayController.updateDistrictHolyday);
router.delete('/delete/:id',districtHolydayController.deleteDistrictHolyday);
module.exports = router;