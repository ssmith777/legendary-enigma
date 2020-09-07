const dotenv = require('dotenv');

const express = require('express');

const mongoose = require('mongoose');

const logger = require('morgan');

const app = express();

// Routes
const users = require('./routes/users');

// Environment Variables
dotenv.config();

// mongoose/mongodb cloud connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to Database'));

// middle wares
app.use(logger('dev'));
// routes
app.use('/users', users);

// catch 404 and forward to error func
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error Handler func
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // respond to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  // respond to ourselves
  console.log(err);
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
