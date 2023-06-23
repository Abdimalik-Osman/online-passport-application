const express = require('express');
const menusController = require("../controllers/menus")


const router = express.Router();

router.post('/add',menusController.add_menus);

module.exports = router;