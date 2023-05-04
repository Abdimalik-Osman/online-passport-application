const express = require('express');
const WorkingHoursController = require("../controllers/workingHours")

const router = express.Router();

// create an WorkingHours
router.post('/add',WorkingHoursController.createWorkingHours)
router.get('/all',WorkingHoursController.getDistrictWorkingHoursData)
router.get('/single/:id',WorkingHoursController.getSingleDistrictWorkingHours)
router.get('/hours/single/:id',WorkingHoursController.getDistrictWorkingHours)
// router.delete('/:id',WorkingHoursController.)
router.patch('/:id',WorkingHoursController.updateWorkingHours)
module.exports = router;