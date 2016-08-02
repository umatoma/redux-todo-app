'use strict';

const _ = require('lodash');

module.exports.index = (req, res) => {
  const knex = req.app.locals.knex;
  knex.select('*')
    .from('todos')
    .where('user_id', 1)
    .map((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todos) => res.json({ todos }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports.create = (req, res) => {
  const knex = req.app.locals.knex;
  const params = _.assign({}, req.body.todo, { user_id: 1, completed: false });

  knex('todos')
    .insert(params)
    .then((id) => knex.first('*').from('todos').where('id', id))
    .then((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todo) => res.json({ todo }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports.update = (req, res) => {
  const knex = req.app.locals.knex;
  const id = parseInt(req.params.id, 10);
  const params = req.body.todo;

  knex('todos')
    .returning('id')
    .where('id', id)
    .update(_.pick(params, ['text', 'completed']))
    .then(() => knex.first('*').from('todos').where('id', id))
    .then((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todo) => res.json({ todo }))
    .catch((err) => res.status(400).json({ error: err.message }));
};
