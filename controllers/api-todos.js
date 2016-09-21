'use strict';

const _ = require('lodash');

module.exports.index = function* index(req, res) {
  const knex = req.app.locals.knex;
  const todos = yield knex.select('*')
    .from('todos')
    .where('user_id', 1)
    .map((todo) => _.assign({}, todo, { completed: !!todo.completed }));
  res.json({ todos });
};

module.exports.create = function* create(req, res) {
  const knex = req.app.locals.knex;
  const params = _.assign({}, req.body.todo, { user_id: 1, completed: false });

  const ids = yield knex('todos').insert(params);
  const todo = yield knex.first('*').from('todos').where('id', ids[0]);
  if (!todo) {
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  }
  res.json({
    todo: _.assign({}, todo, { completed: !!todo.completed })
  });
};

module.exports.update = function* update(req, res) {
  const knex = req.app.locals.knex;
  const id = parseInt(req.params.id, 10);
  const params = _.pick(req.body.todo, ['text', 'completed']);

  yield knex('todos').where('id', id).update(params);
  const todo = yield knex.first('*').from('todos').where('id', id);
  if (!todo) {
    const err = new Error('Not Found');
    err.status = 404;
    throw err;
  }
  res.json({
    todo: _.assign({}, todo, { completed: !!todo.completed })
  });
};

module.exports.notGenerator = (req, res) => {
  res.send('This is not generator function.');
};
