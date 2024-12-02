require('dotenv').config();

module.exports = {
  "core": {
    "username": process.env.DB_USERNAME_CORE,
    "password": process.env.DB_PASSWORD_CORE,
    "database": process.env.DB_NAME_CORE,
    "host": process.env.DB_HOSTNAME_CORE,
    "dialect": process.env.DB_DIALECT_CORE
  }
}
