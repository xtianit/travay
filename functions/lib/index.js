"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const env = functions.config();
// require('dotenv').config();
const Airtable = require("airtable");
const base = new Airtable({ apiKey: env.airtable.key }).base('appfdqs40iR8nY6mW');
exports.addToAirtable = functions.firestore
    .document('users/${user.uid}')
    .onCreate((snap, context) => {
    const data = snap.data();
    // Add the data to the Airtable Base
    return base('CustomerData').create(data);
});
//# sourceMappingURL=index.js.map