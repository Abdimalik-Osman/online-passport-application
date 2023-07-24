const express = require('express');
const multer = require('multer');
const path = require('path');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

// create an applicant
router.post('/add',ApplicantController.createApplicant)
router.get('/approved/all/:districtId/:userId',ApplicantController.getAllApplicants)
router.get('/single/:id',ApplicantController.getSingleApplicant)
router.get('/districts/single/:id/:userId',ApplicantController.getSingleDistrictApplicants)
router.get('/date/unavailable/all/:id',ApplicantController.getUnavailableDates)
router.post('/dates/availableTime/all',ApplicantController.getAvailableDates)
router.delete('/delete/:id',ApplicantController.deleteApplicant)
router.patch('/update/:id',ApplicantController.updateApplicant)
router.get('/view/:appointmentNumber',ApplicantController.viewApplicant)
router.get('/pending/:nID?/:phoneNumber?',ApplicantController.getPendingApplicants)
router.get('/unapproved/all/:districtId/:userId',ApplicantController.getAllUnapprovedApplicants)
router.get('/registered/month/all',ApplicantController.getNumberOfRegisteredApplicantsThisMonth)
router.get('/date/:startDate/:endDate',ApplicantController.getApplicantsFromRange)
router.get('/specific/:date',ApplicantController.getSpecificAppointment)
router.post('/cancel/appointment',ApplicantController.cancelAppointment);
router.patch('/update/appointment/:id',ApplicantController.updateAppointment);
router.get('/images/:id',ApplicantController.getUserImage);
router.get('/appointment/all/:appointmentDate',ApplicantController.getAppointmentByDate);
router.patch('/appointments/cancel/:districtId',ApplicantController.cancelAppointment);

module.exports = router;