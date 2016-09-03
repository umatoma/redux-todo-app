'use strict';

const retry = require('../lib/promise-retry');

module.exports.showCurrent = (req, res) => {
  const knex = req.app.locals.knex;
  retry()
    .setDebug(true)
    .setMaxTimes(5)
    .setInterval(10)
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
