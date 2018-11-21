const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');
const msg = {
  to: 'sannimicheal.se@gmail.com',
  from: 'primuse51@gmail.com',
  subject: 'Tiku, Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);
