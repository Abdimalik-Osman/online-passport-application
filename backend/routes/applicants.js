const express = require('express');
const multer = require('multer');
const path = require('path');
const ApplicantController = require("../controllers/applicants")

const router = express.Router();

// create an applicant
router.post('/add',ApplicantController.createApplicant)
router.get('/approved/all/:districtId/:userId',ApplicantController.getAllApplicants)
router.get('/data/all',ApplicantController.fetchApprovedApplicants)
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
router.post('/upload',ApplicantController.updateApplicant);
router.post('/scan/finger',ApplicantController.scanFingerprint);
router.get('/appointment/all/:appointmentDate/:districtId',ApplicantController.getAppointmentByDate);
router.post('/appointments/cancel',ApplicantController.cancelAppointment);
router.post('/send/message',ApplicantController.sendMessage);
router.post('/wafi/payment',ApplicantController.wafiAPiPayment);
router.get('/date/:startDate?/:endDate?/:userId?',ApplicantController.getApplicantList);
router.get('/today/:userId?',ApplicantController.getApplicantsCreatedToday);
router.get('/month/:userId?',ApplicantController.getApplicantCreatedThisMonth);

module.exports = router;