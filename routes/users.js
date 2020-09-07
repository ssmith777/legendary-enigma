const express = require('express');

const UsersController = require('../controllers/users');

const router = express.Router();

router.route('/')
  .get(UsersController.index)
  .post(UsersController.newUser);

module.exports = router;
