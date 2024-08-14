const transporter = require('../../infra/email/email');

class EmailService {
    async sendEmail({ from, to, subject, text, html }) {
        const mailOptions = {
            from,
            to,
            subject,
            text,
            html
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}

module.exports = new EmailService();
