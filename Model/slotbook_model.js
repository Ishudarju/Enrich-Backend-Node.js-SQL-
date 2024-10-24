const db = require('../Model/DB_connection');

const Slot = {
  create: (data) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO book_your_slot (slot_options, days, date, currentTime) VALUES (?, ?, ?, ?)`;
      db.query(sql, [data.slot_options, data.days, data.date, data.currentTime], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM book_your_slot`;
      db.query(sql, (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM book_your_slot WHERE id = ?`;
      db.query(sql, [id], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  },

  update: (id, data) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE book_your_slot SET slot_options = ?, days = ?, date = ?, currentTime = ? WHERE id = ?`;
      db.query(sql, [data.slot_options, data.days, data.date, data.currentTime, id], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM book_your_slot WHERE id = ?`;
      db.query(sql, [id], (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },
};

module.exports = Slot;
