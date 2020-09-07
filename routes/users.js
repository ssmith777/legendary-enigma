const express = require('express');

const UsersController = require('../handlers/users');

const router = express.Router();

router
  .route('/')
  .get(UsersController.index)
  .post((req, res, next) => {});

module.exports = router;
