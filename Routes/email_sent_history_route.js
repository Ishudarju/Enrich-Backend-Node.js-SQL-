const express = require('express');
const router = express.Router();
const {
  createEmailSentHistory,
  getEmailSentHistories,
  getEmailSentHistoryById,
  getEmailSentHistoryBySubscriptionId,
  getEmailSentHistoryByNewsletterId,
  deleteEmailSentHistory,
} = require('../Controller/email_sent_history_controller');

// Create new email sent history entry
// router.post('/email-sent-history', createEmailSentHistory);

// Get all email sent histories
router.get('/email-sent-histories', getEmailSentHistories);

// Get email sent history by ID
router.get('/email-sent-history/:id', getEmailSentHistoryById);

// Get email sent history by subscription ID
router.get('/email-sent-history/subscription/:subscription_id', getEmailSentHistoryBySubscriptionId);

// Get email sent history by newsletter ID
router.get('/email-sent-history/newsletter/:newsletter_id', getEmailSentHistoryByNewsletterId);

// Delete email sent history by ID
router.delete('/email-sent-history/:id', deleteEmailSentHistory);

module.exports = router;
