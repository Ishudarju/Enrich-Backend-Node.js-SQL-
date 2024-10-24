// Node modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const db = require("./Model/DB_connection"); 

 // Import the MySQL connection
 const messageRoutes = require("./Routes/message_route");  
 const subscriptionRoutes = require("./Routes/subscribe_route");
 const newsLetterRoutes = require("./Routes/newsletter_route")
 const email_send_historys = require("./Routes/email_sent_history_route");
 const appointmentRoutes = require('./Routes/appointment_route');
 const slotRoutes = require("./Routes/slotbook_route");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", messageRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', newsLetterRoutes);
app.use('/api',email_send_historys);
app.use('/appoint_api', appointmentRoutes);
app.use('/slotbook', slotRoutes);

app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});
