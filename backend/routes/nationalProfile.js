const express = require('express');
const GobolkaController = require("../controllers/nationalProfile");

const router = express.Router();

router.post('/add',GobolkaController.insertData);
router.get('/all',GobolkaController.getAllData);
router.get('/person/:id',GobolkaController.getSinglePerson);
module.exports = router;