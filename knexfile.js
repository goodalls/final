module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/final',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};