const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create a MySQL connection
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "enrich",
  waitForConnections: true,
  connectionLimit: 100, // Increased connection limit (adjust this as needed)
  queueLimit: 0
});

// Connect to the database
connection.getConnection((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
  
});

// Export the MySQL connection
module.exports = connection;

