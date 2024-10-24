const db = require('./DB_connection');  // Ensure this path is correct

const NewsLetter = {
  // Create a new newsletter entry
  create: (link, title) => {
    return db.promise().execute(
      'INSERT INTO news_letter (link, title) VALUES (?, ?)',
      [link, title]
    );
  },

  // Get all newsletters
  findAll: () => {
    return db.promise().query('SELECT * FROM news_letter');
  },

  // Get newsletter by ID
  findById: (id) => {
    return db.promise().query('SELECT * FROM news_letter WHERE id = ?', [id]);
  },

  // Update a newsletter by ID
  update: (id, link, title) => {
    return db.promise().execute(
      'UPDATE news_letter SET link = ?, title = ? WHERE id = ?',
      [link, title, id]
    );
  },

  // Delete a newsletter by ID
  delete: (id) => {
    return db.promise().execute('DELETE FROM news_letter WHERE id = ?', [id]);
  },
};

module.exports = NewsLetter;
