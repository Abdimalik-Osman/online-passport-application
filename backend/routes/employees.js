const express = require('express');
const EmployeeController = require("../controllers/employees")

const router = express.Router();

// create an Employee
router.post('/add',EmployeeController.createEmployee)
router.get('/all',EmployeeController.getAllEmployees)
router.get('single/:id',EmployeeController.getSingleEmployee)
router.patch('/update/:id',EmployeeController.updateEmployee)
router.delete('/delete/:id',EmployeeController.deleteEmployee)
module.exports = router;