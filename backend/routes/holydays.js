const express = require('express');
const holyDayController = require("../controllers/holydays")


const router = express.Router();

router.post('/add',holyDayController.createHolyDay);
router.get('/',holyDayController.getHolyDayData);
module.exports = router;