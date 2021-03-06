'use strict';

exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('todos', (t) => {
    t.increments();
    t.integer('user_id').unsigned().notNullable();
    t.text('text').notNullable();
    t.boolean('completed').defaultTo(false).notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('todos')
]);
