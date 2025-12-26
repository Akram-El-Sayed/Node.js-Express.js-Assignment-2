const express = require('express')

const Router = express.Router()
const UserController = require('../controllers/userController')

Router.get("", UserController.findAll);
Router.get("/:id", UserController.findOne);

Router.post("", UserController.createUser);

Router.put("/:id", UserController.updateUser);

Router.delete("/:id", UserController.removeUser);

module.exports = Router