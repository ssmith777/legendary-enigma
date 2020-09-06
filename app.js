const express = require('express');

const logger = require('morgan');

const app = express();

// middle wares
app.use(logger('dev'));
// routes
app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'you requested index page ..hi',
  });
});
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
const port = app.get('port') || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
