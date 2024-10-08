// Node modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./Model/DB_connection"); // Adjust accordingly
 // Import the MySQL connection
 const messageRoutes = require("./Routes/message_route");  // Assuming routes are defined in message_routes.js

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


app.use("/api", messageRoutes);

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
