'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo_tags', (t) => {
      t.increments();
      t.integer('todo_id').unsigned().notNullable();
      t.integer('tag_id').unsigned().notNullable();
      t.unique(['todo_id', 'tag_id']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todo_tags')
  ]);
};
