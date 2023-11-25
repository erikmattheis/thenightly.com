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

// Get a Firestore database reference
const db = admin.firestore();

function sanitizeId(id) {
  return id.replace(/[.#$/[\] ]/g, '_');
}

async function save(collection, doc) {
  try {
    // Add a new document with a generated id to the 'messages' collection
    const docId = sanitizeId(`${doc.input.topic}_${Date.now()}`);

    const docRef = db.collection(collection).doc(docId);
    const timestamp = admin.firestore.Timestamp.now();
    await docRef.set({ ...doc, timestamp });

    const result = docRef.get();
    return result.data();
  } catch (error) {
    return `Error adding document: ${error}`;
  }
}

module.exports = { save };
