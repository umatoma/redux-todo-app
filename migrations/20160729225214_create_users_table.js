'use strict';

exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('name').unique().notNullable();
    t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users')
]);
