const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const twilio = require('twilio');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const accountSid = firebaseConfig.twilio.sid;
const authToken  = firebaseConfig.twilio.token;

const client = new twilio(accountSid, authToken);

const twilioNumber = '+15597853221'; // our Twilio phone number
