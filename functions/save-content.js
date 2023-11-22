// functions/save-content.js
const admin = require('firebase-admin');

// Initialize Firebase
const serviceAccount = require('./path-to-your-service-account-file.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

exports.handler = async function (event, context) {
  // Parse the body of the request
  const body = JSON.parse(event.body);

  // Get the title, description, and content from the body
  const { title, description, content } = body;

  // Save the content to Firestore
  const docRef = db.collection('content').doc();
  await docRef.set({
    title,
    description,
    content,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: docRef.id }),
  };
};