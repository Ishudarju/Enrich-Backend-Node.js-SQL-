const db = require("../Model/DB_connection"); // Import the database connection

// Function to insert a new message
const insertMessage = (name, email, message, number, type, date) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO contact_us (name, email, message, number, type, date) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, email, message, number, type, date], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Function to retrieve all messages
const getAllMessages = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM  contact_us`;
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { insertMessage, getAllMessages };
