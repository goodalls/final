module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/final',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/final_test',
    migrations: {
      directory: './test/db/migrations'
    },
    seeds: {
      directory: './test/db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
  client: 'pg',
  connection: process.env.DATABASE_URL + `?ssl=true`,
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
}
};