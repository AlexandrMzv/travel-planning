/**
 * Подключение к базе данных.
 */
const pgp = require('pg-promise')({
  schema: 'tp',
});

/**
 * Параметры соединения с базой данных.
 */
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'tp_api_user',
  password: 'postgre',
  max: 30,
};

const db = pgp(cn);

export default db;