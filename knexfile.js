// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      database: 'redux_todo'
    },
    pool: {
      min: 0, // 1以上だとDBが死んでもプールインスタンスが残ってしまう？
      max: 10,
      pingTimeout: 1000,
      requestTimeout: 3000
    },
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
