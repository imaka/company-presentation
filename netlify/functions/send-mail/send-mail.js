const process = require('process');
const nodeMailer = require('nodemailer');

const validateParams = body => {
  return body.subject && body.text;
};

/**
 * Responds only to POST requests.
 */
const handler = async event => {
  switch (event.httpMethod) {
    case 'POST':
      const body = JSON.parse(event.body);

      if (!validateParams(body)) {
        return {
          statusCode: 422,
          body: 'Missing arguments'
        };
      }

      const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.NFX_SENDMAIL_GMAIL_ADDRESS,
          serviceClient: process.env.NFX_SENDMAIL_CLIENT_ID,
          privateKey: process.env.NFX_SENDMAIL_PRIVATE_KEY.replace(/\\n/g, '\n')
        }
      });

      const mailOptions = {
        from: body.from || process.env.NFX_SENDMAIL_MAIL_FROM,
        to: body.to || process.env.NFX_SENDMAIL_MAIL_TO,
        bcc: body.bcc || process.env.NFX_SENDMAIL_MAIL_BCC,
        subject: body.subject,
        text: body.text
      };

      try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: '' };
      } catch (error) {
        return { statusCode: 500, body: error.message };
      }
    default:
      return {
        statusCode: 405,
        body: 'Wrong HTTP method'
      };
  }
};

module.exports = { handler };
