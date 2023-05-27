const express = require('express');
const UsersController = require("../controllers/users")

const router = express.Router();

// create an Users
router.post('/register',UsersController.register)
router.post('/login',UsersController.login)
router.get('/all',UsersController.getAllUsers)
router.get('/single/:id',UsersController.getSingleUser)
router.delete('/delete/:id',UsersController.deleteUser)
router.patch('/update/:id',UsersController.updateUser)
module.exports = router;