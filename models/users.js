const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'car',
    },
  ],
});

const User = mongoose.model('user', usersSchema);

module.exports = User;
