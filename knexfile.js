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
  }
};