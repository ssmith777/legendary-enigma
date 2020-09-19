// Note: We use this so we don't need try-catch on async funcs :)
const router = require('express-promise-router')();
const UsersController = require('../controllers/users');

// prettier-ignore
router.route('/')
  .get(UsersController.index)
  .post(UsersController.newUser);

// prettier-ignore
router.route('/:userId')
  .get(UsersController.getUser)
  .put(UsersController.replaceUser)
  .patch(UsersController.updateUser);

module.exports = router;
