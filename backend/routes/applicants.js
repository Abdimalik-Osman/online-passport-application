const express = require('express');
const multer = require('multer');
const path = require('path');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

// create an applicant
router.post('/add',ApplicantController.createApplicant)
router.get('/approved/all',ApplicantController.getAllApplicants)
router.get('/single/:id',ApplicantController.getSingleApplicant)
router.get('/date/unavailable/all/:id',ApplicantController.getUnavailableDates)
router.post('/dates/availableTime/all',ApplicantController.getAvailableDates)
router.delete('/delete/:id',ApplicantController.deleteApplicant)
router.patch('/update/:id',ApplicantController.updateApplicant)
router.get('/view/:appointmentNumber/:phoneNumber',ApplicantController.viewApplicant)
router.get('/pending/:nID?/:phoneNumber?',ApplicantController.getPendingApplicants)
router.get('/unapproved/all',ApplicantController.getAllUnapprovedApplicants)
router.get('/registered/month/all',ApplicantController.getNumberOfRegisteredApplicantsThisMonth)
router.get('/date/:startDate/:endDate',ApplicantController.getApplicantsFromRange)

module.exports = router;