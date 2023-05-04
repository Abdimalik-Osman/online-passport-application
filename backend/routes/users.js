const express = require('express');
const UsersController = require("../controllers/users")

const router = express.Router();

// create an Users
router.post('/add',UsersController.register)
router.post('/login',UsersController.login)
router.get('/',UsersController.getAllUsers)
router.get('/:id',UsersController.getSingleUser)
router.delete('/:id',UsersController.deleteUser)
router.patch('/:id',UsersController.updateUser)
module.exports = router;