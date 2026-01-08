const express = require('express')

const Router = express.Router()
const UserController = require('../controllers/userController');
const { uploader } = require('../utils/uploader');

Router.get("", UserController.findAll);
Router.get("/:id", UserController.findOne);

Router.post("", uploader.single('avatar'),UserController.createUser);

Router.put("/:id", UserController.updateUser);

Router.delete("/:id", UserController.removeUser);

module.exports = Router