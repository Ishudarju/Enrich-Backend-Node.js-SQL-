const db = require('../Model/DB_connection');

const Subscription = {
  create : (email,status, date) => {
    return db.promise().execute(
      'INSERT INTO subscriptions (email,subscribe_status, date) VALUES (?,?, ?)',
   [email,status ? 1 : 0, date] 
    );
  },

  findAll: () => {
    return db.promise().query('SELECT * FROM subscriptions');
  },

  // Get a subscription by ID
  findById: (id) => {
    return db.promise().query('SELECT * FROM subscriptions WHERE id = ?', [id]);
  },


  // Update a subscription by ID
  update: (id, email,status,date) => {
    return db.promise().execute(
      'UPDATE subscriptions SET subscribe_status = ?, date = ?, email = ? WHERE id = ?',
       [id,email,status ? 1 : 0, date] 
    );
  },

  // Delete a subscription by ID
  delete: (id) => {
    return db.promise().execute('DELETE FROM subscriptions WHERE id = ?', [id]);
  },
};





module.exports = Subscription;
