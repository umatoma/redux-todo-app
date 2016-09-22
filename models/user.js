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
      isRetryableError: (err) => {
        if (err.message === 'Pool is destroyed') {
          knex.client.pool.destroy();
          knex.client.initializePool(knex.client.config);
          return true;
        }

        if (err.message.includes('Timeout acquiring a connection')) {
          return true;
        }

        return false;
      }
    })
    .execute(() => knex.first('*').from('users').where('id', id));
  }
}

module.exports = User;
