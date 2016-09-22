'use strict';

const retry = require('../lib/promise-retry');
const logger = require('../lib/logger').getLogger();

class User {
  constructor(knex) {
    this.knex = knex;
  }

  firstById(id) {
    const knex = this.knex;
    return retry({
      maxTimes: 3,
      interval: 1000,
      logger,
      isRetryableError: () => {
        if (!knex.client.pool || knex.client.pool.available.length === 0) {
          knex.client.initializePool(knex.client.config);
          return true;
        }

        return false;
      }
    })
    .execute(() => knex.first('*').from('users').where('id', id));
  }
}

module.exports = User;
