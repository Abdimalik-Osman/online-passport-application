const express = require('express');
const EmployeeController = require("../controllers/employees")

const router = express.Router();

// create an Employee
router.post('/add',EmployeeController.createEmployee)
router.get('/',EmployeeController.getAllEmployees)
router.get('/:id',EmployeeController.getSingleEmployee)
router.patch('/:id',EmployeeController.updateEmployee)
router.delete('/:id',EmployeeController.deleteEmployee)
module.exports = router;