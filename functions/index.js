/* eslint-disable*/

var functions = require('firebase-functions')
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendgridMail =
  functions.database.ref('/test/{pushId}').onWrite(event => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey('YOUR-API-KEY');
    const msg = {
      to: some-email@gmail.com',
      from: 'your-email@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with
    Node.js</strong>',
  };
    sgMail.send(msg);

    if (msg !== undefined) return true;
  })
