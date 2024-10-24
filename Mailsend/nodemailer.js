const nodemailer = require('nodemailer');

const dotenv = require("dotenv");

dotenv.config();

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env["EMAIL_HOST"],
    port: process.env["EMAIL_PORT"],
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (subscriptionId, newsletterId) => {
    try {
        const mailOptions = {
            from: "perarasup998@gmail.com",
            to: process.env.EMAIL_TO, // Add recipient email here           
            subject: 'Newsletter Subject',
            text: 'This is the content of the newsletter',
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        // If sent, create a record in the email_sent_history
        if (info.accepted.length > 0) {
            await EmailSentHistory.create(subscriptionId, newsletterId, 1, 'Newsletter Subject', 'System', 'Email content here...');
        } else {
            await EmailSentHistory.create(subscriptionId, newsletterId, 0, 'Newsletter Subject', 'System', 'Email failed to send.');
        }
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

const Subscription = require('../Model/subscribe_model');

const sendmail = async (subscriptionId, newsletterId, email) => {
    try {
        // Check if the subscription exists
        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            return res.status(400).json({ error: "Subscription does not exist" });
        }

        const mailOptions = {
            from: "perarasup998@gmail.com",
            to: email,
            subject: 'Newsletter Subject',
            text: 'This is the content of the newsletter',
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        // If sent, create a record in email_sent_history
        if (info.accepted.length > 0) {
            await EmailSentHistory.create(subscriptionId, newsletterId, 1, 'Newsletter Subject', 'System', 'Email content here...');
        } else {
            await EmailSentHistory.create(subscriptionId, newsletterId, 0, 'Newsletter Subject', 'System', 'Email failed to send.');
        }

        // Log success message
        console.log('Email sent:', info.response);
    } catch (err) {
        // Handle and log the error
        console.error('Error sending email:', err);
        await EmailSentHistory.create(subscriptionId, newsletterId, 0, 'Newsletter Subject', 'System', 'Error sending email.');
    }
};






// const nodemailer = require('nodemailer');
// // const pool = require('../Model/DB_connection');
// const EmailSentHistory = require('../Model/email_send_history_model');
// const dotenv = require("dotenv");

// dotenv.config();

// exports.sendMail = async (email, title, link) => {
//     try {
//         // Construct the email content with a colorful, modern design
//         let mailContent = `
//         <html>
//         <p>Welcome to the Enrich Newsletter, ${email}!</p>
//         <p>Check out the latest updates here: <a href="${link}">${title}</a></p>
//         </html>
//         `;

//         // Configure Nodemailer
//         const transporter = nodemailer.createTransport({
//             host: process.env["EMAIL_HOST"],
//             port: process.env["EMAIL_PORT"],
//             secure: true, // Use TLS
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         // Setup email data
//         const mailOptions = {
//             from: "perarasup998@gmail.com",   // Sender's email
//             to: "ishudarju46@gmail.com",                      // Recipient email (dynamic)
//             subject: title,                 // Subject dynamically set from the title
//             html: mailContent,              // Use HTML for rich formatting
//         };

//         // Send the email and await the result
//         const info = await transporter.sendMail(mailOptions);

//         console.log("Email sent successfully:", info.response);

//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }








