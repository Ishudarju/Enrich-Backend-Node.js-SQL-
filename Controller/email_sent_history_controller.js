const EmailSentHistory = require('../Model/email_send_history_model');
const sendMail = require("../Mailsend/nodemailer.js")

// Create a new email sent history
const createEmailSentHistory = async (req, res) => {
  const { subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content } = req.body;
  try {
    await EmailSentHistory.create(subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content);
    res.status(201).send({ message: 'Email sent history created successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Error creating email sent history', details: err });
  }
};

// Get all email sent histories
const getEmailSentHistories = async (req, res) => {
  try {
    const [histories] = await EmailSentHistory.findAll();
    res.status(200).json(histories);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching email sent histories', details: err });
  }
};

// Get email sent history by ID
const getEmailSentHistoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [history] = await EmailSentHistory.findById(id);
    if (history.length === 0) {
      return res.status(404).send({ message: 'Email sent history not found' });
    }
    res.status(200).json(history[0]);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching email sent history', details: err });
  }
};

// Get email sent history by subscription ID
const getEmailSentHistoryBySubscriptionId = async (req, res) => {
  const { subscription_id } = req.params;
  try {
    const [history] = await EmailSentHistory.findBySubscriptionId(subscription_id);
    if (history.length === 0) {
      return res.status(404).send({ message: 'Email sent history not found' });
    }
    res.status(200).json(history);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching email sent history', details: err });
  }
};

// Get email sent history by newsletter ID
const getEmailSentHistoryByNewsletterId = async (req, res) => {
  const { newsletter_id } = req.params;
  try {
    const [history] = await EmailSentHistory.findByNewsletterId(newsletter_id);
    if (history.length === 0) {
      return res.status(404).send({ message: 'Email sent history not found' });
    }
    res.status(200).json(history);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching email sent history', details: err });
  }
};

// Delete email sent history entry by ID
const deleteEmailSentHistory = async (req, res) => {
  const { id } = req.params;
  try {
    await EmailSentHistory.delete(id);
    res.status(200).send({ message: 'Email sent history deleted successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting email sent history', details: err });
  }
};

module.exports = {
  createEmailSentHistory,
  getEmailSentHistories,
  getEmailSentHistoryById,
  getEmailSentHistoryBySubscriptionId,
  getEmailSentHistoryByNewsletterId,
  deleteEmailSentHistory,
};
