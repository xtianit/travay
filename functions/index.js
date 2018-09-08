const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const twilio = require('twilio');

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const accountSid = firebaseConfig.twilio.sid;
const authToken  = firebaseConfig.twilio.token;

const client = new twilio(accountSid, authToken);

const twilioNumber = '+15597853221'; // our Twilio phone number


// start cloud function

exports.textStatus = functions.database
  .ref(`/users/${this.userId}/optInTexts`)
  .onUpdate(event => {


    const users = event.params.users;

    return admin.database()
      .ref(`/users/${this.userId}/optInTexts`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then(user => {
        const optInTexts   = user.optInTexts;
        const phone = user.phone;

        if ( !validE164(phoneNumber) ) {
          throw new Error('number must be E164 format!')
        }

        const textMessage = {
          body: `Current optin status: ${optInTexts}`,
          to: phoneNumber,  // Text to this number
          from: twilioNumber // From a valid Twilio number
        };

        return client.messages.create(textMessage)
      })
      .then(message => console.log(message.sid, 'success'))
      .catch(err => console.log(err))


  });


// Validate E164 format
function validE164(num) {
  return /^\+?[1-9]\d{1,14}$/.test(num)
}
