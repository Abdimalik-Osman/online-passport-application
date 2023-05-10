const express = require('express');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

// create an applicant
router.post('/add',ApplicantController.createApplicant)
router.get('/',ApplicantController.getAllApplicants)
router.get('/:id',ApplicantController.getSingleApplicant)
router.get('/date/unavailable/all/:id',ApplicantController.getUnavailableDates)
router.delete('/:id',ApplicantController.deleteApplicant)
module.exports = router;