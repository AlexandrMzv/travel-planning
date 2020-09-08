/**
 * Реализация интерфейса для системы авторизации passport.
 */
import db from './db';
import bcrypt from 'bcrypt';

const User = {
  salt: bcrypt.genSaltSync(10),

  findOne(login) {
    return db.one('SELECT id, password, name FROM users WHERE email = ${email}', { email: login.email });
  },

  findById(id) {
    return db.one('SELECT id, password, email, name, last_name FROM users WHERE id = ${id}', { id: id });
  },

  checkPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  },
};

export default User;