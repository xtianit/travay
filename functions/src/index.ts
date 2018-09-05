import * as functions from 'firebase-functions';
const env = functions.config();
// require('dotenv').config();

import * as Airtable from 'airtable';

const base = new Airtable({apiKey: env.airtable.key }).base('appfdqs40iR8nY6mW');

exports.addToAirtable = functions.firestore
  .document('users/${user.uid}')
  .onCreate((snap, context) => {
    const data = snap.data();

    // Add the data to the Airtable Base
    return base('CustomerData').create(data);
  });
