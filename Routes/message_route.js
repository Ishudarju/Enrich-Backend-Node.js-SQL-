const express = require('express');
const messageController = require('../Controller/message_controller');
const mailController=require('../Mailsend/mailsendto');

const router = express.Router();

// Define routes
router.post('/createmessages', messageController.createdata); // Route to insert a new message
router.get('/listmessages', messageController.getdata);   // Route to get all messages
// router.post('/send-mail', mailController.sendMail);

module.exports = router;
