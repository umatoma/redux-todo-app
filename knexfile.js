// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'redux_todo'
    },
    acquireConnectionTimeout: 5000,
    migrations: {
      tableName: 'migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
