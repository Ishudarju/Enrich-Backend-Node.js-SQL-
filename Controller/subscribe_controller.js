const Subscription = require('../Model/subscribe_model');

// Create a new subscription
const createSubscription = async (req, res) => {
  const {email, subscribe_status, date } = req.body;
  try {
    await Subscription.create(email,subscribe_status, date);
    res.status(201).send({ message: 'Subscription created successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Error creating subscription', details: err });
  }
};

// Get all subscriptions
const getSubscriptions = async (req, res) => {
  try {
    const [subscriptions] = await Subscription.findAll();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching subscriptions', details: err });
  }
};


// Update a subscription by ID
const updateSubscription = async (req, res) => {
    const { id } = req.params;
    const { subscribe_status, date, email } = req.body;
    try {
      const [subscription] = await Subscription.findById(id);
      if (subscription.length === 0) {
        return res.status(404).send({ message: 'Subscription not found' });
      }
      await Subscription.update(id, subscribe_status, date, email);
      res.status(200).send({ message: 'Subscription updated successfully!' });
    } catch (err) {
      res.status(500).send({ error: 'Error updating subscription', details: err });
    }
  };

  // Get a subscription by ID (This should be defined)
const getSubscriptionById = async (req, res) => {
    const { id } = req.params;
    try {
      const [subscription] = await Subscription.findById(id);
      if (subscription.length === 0) {
        return res.status(404).send({ message: 'Subscription not found' });
      }
      res.status(200).json(subscription[0]);
    } catch (err) {
      res.status(500).send({ error: 'Error fetching subscription', details: err });
    }
  };
  
  // Delete a subscription by ID
  const deleteSubscription = async (req, res) => {
    const { id } = req.params;
    try {
      const [subscription] = await Subscription.findById(id);
      if (subscription.length === 0) {
        return res.status(404).send({ message: 'Subscription not found' });
      }
      await Subscription.delete(id);
      res.status(200).send({ message: 'Subscription deleted successfully!' });
    } catch (err) {
      res.status(500).send({ error: 'Error deleting subscription', details: err });
    }
  };
  
  module.exports = {
    createSubscription,
    getSubscriptions,
    getSubscriptionById,
    updateSubscription,
    deleteSubscription
  };


