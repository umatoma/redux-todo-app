'use strict';

const User = require('../models/user');

module.exports.showCurrent = (req, res) => {
  const knex = req.app.locals.knex;
  new User(knex).firstById(1)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Not Found' });
      }
      return res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
