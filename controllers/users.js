const User = require('../models/users');

module.exports = {
  index: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json(users);
  },

  newUser: async (req, res, next) => {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  },
  getUser: async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  },

  replaceUser: async (req, res, next) => {
    const { userId } = req.params;
    const newUser = req.body;

    console.log('UserId: ', userId);
    console.log('newUser ', newUser);
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
