const express = require('express');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

router.post('/add',ApplicantController.createApplicant)
module.exports = router;