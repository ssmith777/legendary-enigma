const express = require('express');

// Note: We use this so we don't need try-catch on async funcs :)
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

router.route('/').get(UsersController.index).post(UsersController.newUser);

module.exports = router;
