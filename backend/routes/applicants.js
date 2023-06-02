const express = require('express');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

// create an applicant
router.post('/add',ApplicantController.createApplicant)
router.get('/all',ApplicantController.getAllApplicants)
router.get('/single/:id',ApplicantController.getSingleApplicant)
router.get('/date/unavailable/all/:id',ApplicantController.getUnavailableDates)
router.post('/dates/availableTime/all',ApplicantController.getAvailableDates)
router.delete('/delete/:id',ApplicantController.deleteApplicant)
router.patch('/update/:id',ApplicantController.updateApplicant)
module.exports = router;