'use strict';

const retry = require('../lib/promise-retry');
const logger = require('../lib/logger').getLogger();

module.exports.showCurrent = (req, res) => {
  const knex = req.app.locals.knex;
  retry({ maxTimes: 3, iterval: 10, logger })
    .execute(() => knex.first('*').from('users').where('id', 1))
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'Not Found' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
