const { sendMail } = require('../Mailsend/nodemailer.js');
const NewsLetter = require('../Model/newsletter_model');
const subscribers = require("../Model/subscribe_model.js")
const email_history = require("../Model/email_send_history_model.js")

// Create a new newsletter
const createNewsLetter = async (req, res) => {
  const { link, title } = req.body;

  // Check if link and title exist
  if (!link || !title) {
    console.error("Link or title is undefined or missing:", { link, title });
    return res.status(400).send({ error: 'Link and title are required.' });
  }

  try {
    // Create the newsletter
    const [result] = await NewsLetter.create(link, title);
    const result_id = result.insertId;

    // Check if insertId was returned
    if (!result_id) {
      throw new Error('No insert ID returned when creating newsletter.');
    }

    console.log('Newsletter created with ID:', result_id);

    // Fetch all subscribers
    const array_sub = await subscribers.findAll();

    // Check if there are subscribers
    if (!array_sub || array_sub.length === 0) {
      throw new Error('No subscribers found.');
    }

    console.log('Found', array_sub.length, 'subscribers.');

    // Map over subscribers and send emails + update email history
    const emailPromises = array_sub.map(async (subscriber) => {
      if (!subscriber.id || !subscriber.email) {
        console.error('Invalid subscriber data:', subscriber);
        return; // Skip this subscriber if invalid
      }

      console.log(`Sending email to ${subscriber.email}...`);

      try {
        // Sending email
        await sendMail(subscriber.email, title, link);

        // Inserting email history
        console.log('Inserting email history for subscriber ID:', subscriber.id);
        console.log('Newsletter ID:', result_id);
        console.log('Email content:', link);

        const insertHistoryResult = await email_history.create(
          subscriber.id,              // subscription_id
          result_id,                  // newsletter_id
          true,                       // email_sent_status (Assuming email sent successfully)
          "newsletter",               // subject
          "admin",                    // sent_by
          link                        // email_content
        );

        console.log('Email history inserted:', insertHistoryResult);
      } catch (err) {
        console.error(`Error sending email to ${subscriber.email} or inserting email history:`, err);
        // Optionally log this error to a separate table or handle differently
      }
    });

    // Wait for all emails to be sent and histories to be recorded
    await Promise.all(emailPromises);

    // Respond success after everything is done
    res.status(201).send({ message: 'Newsletter created and emails sent successfully!' });

  } catch (err) {
    // Handle any errors during newsletter creation or email sending
    console.error('Error creating newsletter or sending emails:', err);
    res.status(500).send({ error: 'Error creating newsletter or sending emails', details: err.message });
  }
};




// Get all newsletters
const getNewsLetters = async (req, res) => {
  try {
    const [newsletters] = await NewsLetter.findAll();

    // await sendMail(title,link,email_id);
    // email_history.insert(sub_id,newsid,email_status,)
    res.status(200).json(newsletters);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching newsletters', details: err });
  }
};

// Get a newsletter by ID
const getNewsLetterById = async (req, res) => {
  const { id } = req.params;
  try {
    const [newsletter] = await NewsLetter.findById(id);
    if (newsletter.length === 0) {
      return res.status(404).send({ message: 'Newsletter not found' });
    }
    res.status(200).json(newsletter[0]);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching newsletter', details: err });
  }
};

// Update a newsletter by ID
const updateNewsLetter = async (req, res) => {
  const { id } = req.params;
  const { link, title } = req.body;
  try {
    const [newsletter] = await NewsLetter.findById(id);
    if (newsletter.length === 0) {
      return res.status(404).send({ message: 'Newsletter not found' });
    }
    await NewsLetter.update(id, link, title);
    res.status(200).send({ message: 'Newsletter updated successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Error updating newsletter', details: err });
  }
};

// Delete a newsletter by ID
const deleteNewsLetter = async (req, res) => {
  const { id } = req.params;
  try {
    const [newsletter] = await NewsLetter.findById(id);
    if (newsletter.length === 0) {
      return res.status(404).send({ message: 'Newsletter not found' });
    }
    await NewsLetter.delete(id);
    res.status(200).send({ message: 'Newsletter deleted successfully!' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting newsletter', details: err });
  }
};

module.exports = {
  createNewsLetter,
  getNewsLetters,
  getNewsLetterById,
  updateNewsLetter,
  deleteNewsLetter
};
