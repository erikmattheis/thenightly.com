const admin = require('firebase-admin');

const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Load your service account credentials from an environment variable or secret manager
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize the Firebase application with the service account credentials
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
console.log('admin.apps keys', Object.keys(admin.apps));

const db = admin.firestore();

exports.handler = async () => {
  try {
    // Add a new document with a generated id to the 'messages' collection
    const docRef = await db.collection('messages').add({
      message: 'Hello, World!',
    });

    return {
      statusCode: 200,
      body: `Document successfully written with ID: ${docRef.id}`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error writing document: ${error}`,
    };
  }
};
