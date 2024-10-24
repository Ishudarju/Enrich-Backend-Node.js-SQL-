const express = require('express');
const { createSubscription, getSubscriptions, getSubscriptionById, updateSubscription,
    deleteSubscription } = require('../Controller/subscribe_controller');

const router = express.Router();

// Route to create a subscription
router.post('/subscribe', createSubscription);

// Route to get all subscriptions
router.get('/subscriptions', getSubscriptions);

// Get a subscription by ID
router.get('/subscriptions/:id', getSubscriptionById);

// Update a subscription by ID
router.put('/subscriptions/:id', updateSubscription);

// Delete a subscription by ID
router.delete('/subscriptions/:id', deleteSubscription);

module.exports = router;
