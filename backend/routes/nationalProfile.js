const express = require('express');
const GobolkaController = require("../controllers/nationalProfile");

const router = express.Router();

router.post('/add',GobolkaController.insertData);
router.get('/',GobolkaController.getAllData);
router.get('/:serialNumber',GobolkaController.getSinglePerson);
module.exports = router;