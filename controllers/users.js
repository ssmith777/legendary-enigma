const User = require('../models/users');

module.exports = {
  index: async (req, res, next) => {
    await User.find({})
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        next(err);
      });
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser
      .save()
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        next(err);
      });
  },
};

/*
 we can use mongoose in 3 ways
1.) Call backs
  module.exports = {
    index: (req, res, next) => {
      User.find({}, (err, users) => {
        if (err) {
          next(err);
        }
        res.status(200).json(users);
      });
    },

    newUser: (req, res, next) => {
      const newUser = new User(req.body);
      newUser.save((err, user) => {
        res.status(201).json(user);
      });
    },
  };

2.) Promises
3.) Async/Await (Promises)
*/
