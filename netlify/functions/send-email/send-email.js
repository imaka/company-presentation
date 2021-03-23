const process = require('process');
const nodeMailer = require('nodemailer');

const { validateParams } = require('./validations');

const handler = async event => {
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
      user: process.env.GMAIL_ADDRESS,
      serviceClient: process.env.CLIENT_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
    }
  });

  const mailOptions = {
    from: body.from || process.env.MAIL_FROM,
    to: body.to || process.env.MAIL_TO,
    bcc: body.bcc || process.env.MAIL_BCC,
    subject: body.subject,
    text: body.text
  };

  try {
    await transporter.sendMail(mailOptions);
    return { statusCode: 200, body: '' };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};

module.exports = { handler };
