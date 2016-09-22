'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const logger = require('./lib/logger');
const knexLogger = require('./lib/knex-logger');
const knex = require('knex')(require('./knexfile')[NODE_ENV]);

const app = new Express();
const port = 3000;

knexLogger(knex, logger.getLogger());
app.locals.knex = knex;

app.use(Express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(routes);
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.json({
    error: { message: err.message }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
