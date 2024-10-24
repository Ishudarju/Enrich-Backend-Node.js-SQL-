const db = require('../Model/DB_connection');  

const EmailSentHistory = {
  // Create a new email sent history entry
  create: (subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content) => {
    return db.promise().execute(
      'INSERT INTO email_sent_history (subscription_id, newsletter_id, email_sent_status, sent_date, subject, sent_by, email_content) VALUES (?, ?, ?, NOW(), ?, ?, ?)',
      [subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content]
    );
  },

  // Get all email sent histories
  findAll: () => {
    return db.promise().query('SELECT * FROM email_sent_history');
  },

  // Get email sent history by ID
  findById: (id) => {
    return db.promise().query('SELECT * FROM email_sent_history WHERE id = ?', [id]);
  },

  // Get email sent history by subscription ID
  findBySubscriptionId: (subscription_id) => {
    return db.promise().query('SELECT * FROM email_sent_history WHERE subscription_id = ?', [subscription_id]);
  },

  // Get email sent history by newsletter ID
  findByNewsletterId: (newsletter_id) => {
    return db.promise().query('SELECT * FROM email_sent_history WHERE newsletter_id = ?', [newsletter_id]);
  },

  // Delete an email sent history entry by ID
  delete: (id) => {
    return db.promise().execute('DELETE FROM email_sent_history WHERE id = ?', [id]);
  },
};

module.exports = EmailSentHistory;



// const db = require('../Model/DB_connection');  // Ensure that this is the correct DB connection module

// const EmailSentHistory = {
//   // Create a new email sent history entry
 
//   create: async (subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content) => {
//     try {
//       const [result] = await db.promise().execute(
//         'INSERT INTO email_sent_history (subscription_id, newsletter_id, email_sent_status, sent_date, subject, sent_by, email_content) VALUES (?, ?, ?, NOW(), ?, ?, ?)',
//         [subscription_id, newsletter_id, email_sent_status, subject, sent_by, email_content]
//       );
//       console.log(result)
//       return result;
     
//     } catch (error) {
//       console.error('Error inserting email sent history:', error);
//       throw error;
//     }
//   },

//   // Get all email sent histories
//   findAll: async () => {
//     try {
//       const [result] = await db.promise().query('SELECT * FROM email_sent_history');
//       return result;
//     } catch (error) {
//       console.error('Error fetching all email histories:', error);
//       throw error;
//     }
//   },

//   // Get email sent history by ID
//   findById: async (id) => {
//     try {
//       const [result] = await db.promise().query('SELECT * FROM email_sent_history WHERE id = ?', [id]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching email history by ID:', error);
//       throw error;
//     }
//   },

//   // Get email sent history by subscription ID
//   findBySubscriptionId: async (subscription_id) => {
//     try {
//       const [result] = await db.promise().query('SELECT * FROM email_sent_history WHERE subscription_id = ?', [subscription_id]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching email history by subscription ID:', error);
//       throw error;
//     }
//   },

//   // Get email sent history by newsletter ID
//   findByNewsletterId: async (newsletter_id) => {
//     try {
//       const [result] = await db.promise().query('SELECT * FROM email_sent_history WHERE newsletter_id = ?', [newsletter_id]);
//       return result;
//     } catch (error) {
//       console.error('Error fetching email history by newsletter ID:', error);
//       throw error;
//     }
//   },

//   // Delete an email sent history entry by ID
//   delete: async (id) => {
//     try {
//       const [result] = await db.promise().execute('DELETE FROM email_sent_history WHERE id = ?', [id]);
//       return result;
//     } catch (error) {
//       console.error('Error deleting email sent history by ID:', error);
//       throw error;
//     }
//   },
// };

// module.exports = EmailSentHistory;
