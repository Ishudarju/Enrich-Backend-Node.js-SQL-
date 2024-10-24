const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

// Create a transporter for sending emails


// Function to send an email
const sendEmail = (frommail,recipient, subject, templateData, templateName) => {

    
    const transporter = nodemailer.createTransport({
        host: process.env["EMAIL_HOST"],
        port: process.env["EMAIL_PORT"],
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });   // Define the path to your HTML templates
    const templatePath = path.join(__dirname, `../Appoint_styling/${templateName}.html`);

    // Read the template file
    fs.readFile(templatePath, 'utf8', (err, html) => {
        if (err) {
            console.error('Error reading email template:', err);
            return;
        }

        // Replace placeholders in the template with actual data
        const emailHtml = html
            .replace(/\${name}/g, templateData.name)
            .replace(/\${email}/g, templateData.email)
            .replace(/\${number}/g, templateData.number)
            .replace(/\${age}/g, templateData.age)
            .replace(/\${selectedAssessment}/g, templateData.selectedAssessment)
            .replace(/\${selectDate}/g, templateData.selectDate)            
            // .replace(/\${paymentMethod}/g, templateData.paymentMethod)
            .replace(/\${paymentDetails}/g, templateData.paymentDetails)
            .replace(/\${slots}/g, templateData.slots);
           

        // Set up email data
        const mailOptions = {
            from:frommail ,
            to: recipient,
            subject: subject,
            html: emailHtml // Send the HTML content
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);
            }
            console.log('Email sent:', info.response);
        });
}
)};

module.exports = { sendEmail };
