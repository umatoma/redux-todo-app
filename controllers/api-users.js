'use strict';

const Retry = require('../lib/promise-retry');

module.exports.showCurrent = (req, res) => {
  let knex = req.app.locals.knex;
  Retry()
    .debug(true)
    .maxTimes(5)
    .interval(10)
    .execute((retryCount) => {
      return knex.first('*')
        .from('users')
        .where('id', 1);
    })
    .then((user) => {
      user ? res.json(user) : res.status(404).json({ error: 'Not Found' });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
