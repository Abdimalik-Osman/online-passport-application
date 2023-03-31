const express = require('express');
const GobolkaController = require("../controllers/xgobolka")

const router = express.Router();

router.get('/add',GobolkaController.insertData)
module.exports = router;