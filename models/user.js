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
      isRetryableError: (err) => !err.sqlState  // 接続出来ていればリトライしない
    })
    .execute(() => knex.first('*').from('users').where('id', id));
  }
}

module.exports = User;
