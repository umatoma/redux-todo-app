'use strict';

const _ = require('lodash');

module.exports.index = (req, res) => {
  let knex = req.app.locals.knex;
  knex.select('*')
    .from('todos')
    .where('user_id', 1)
    .map((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todos) => res.json({ todos: todos }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports.create = (req, res) => {
  let knex = req.app.locals.knex;
  let params = _.assign({}, req.body.todo, { user_id: 1, completed: false });

  knex('todos')
    .insert(params)
    .then((id) => {
      return knex.first('*')
        .from('todos')
        .where('id', id);
    })
    .then((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todo) => res.json({ todo: todo }))
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports.update = (req, res) => {
  let knex = req.app.locals.knex;
  let id = parseInt(req.params.id);
  let params = req.body.todo;

  knex('todos')
    .returning('id')
    .where('id', id)
    .update(_.pick(params, ['text', 'completed']))
    .then((updated) => {
      return knex.first('*')
        .from('todos')
        .where('id', id);
    })
    .then((todo) => _.assign({}, todo, { completed: !!todo.completed }))
    .then((todo) => res.json({ todo: todo }))
    .catch((err) => res.status(400).json({ error: err.message }));
};
