'use strict';

const NODE_ENV    = process.env.NODE_ENV || 'development';
const _           = require('lodash');
const express     = require('express');
const path        = require('path');
const bodyParser  = require('body-parser');
const routes      = require('./routes');
const knexLogger  = require('./lib/knex-logger');
const app         = new express();
const knex        = require('knex')(require('./knexfile')[NODE_ENV]);
const port        = 3000;

knexLogger(knex);
app.locals.knex = knex;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
