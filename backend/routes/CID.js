const express = require('express');
const CidController = require("../controllers/CID")


const router = express.Router();

router.post('/add',CidController.createData);
router.get('/',CidController.getCidData);
module.exports = router;