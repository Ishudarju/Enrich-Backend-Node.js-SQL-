const MessageModel = require('../Model/message_model');
const { sendMail } = require("../Mailsend/mailsendto.js");

// Controller to handle inserting a new message
const createdata = async (req, res) => {
    const { name, email, message, number, type, date } = req.body;

    try {
        const result = await MessageModel.insertMessage(name, email, message, number, type, date);
        console.log(result)
                await sendMail(req.body)
        res.status(201).json({ message: 'Message inserted successfully', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Error inserting message', details: err });
    }
};

// Controller to get all messages
const getdata = async (req, res) => {
    try {
        const messages = await MessageModel.getAllMessages();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving messages', details: err });
    }
};

module.exports = { createdata, getdata };
