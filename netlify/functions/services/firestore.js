const admin = require('firebase-admin');

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
  console.log('Saving to Firestore...', collection);
  try {
    // Add a new document with a generated id to the 'messages' collection
    const docId = sanitizeId(`${doc.input.topic}`);

    const docRef = db.collection(collection).doc(docId);
    const timestamp = admin.firestore.Timestamp.now();
    await docRef.set({ ...doc, docId, timestamp });

    const result = docRef.get();
    return result.data();
  } catch (error) {
    return `Error adding document: ${error}`;
  }
}

async function getArticles(name) {
  const articlesRef = db.collection(name); // .orderBy('topic', 'asc');
  const snapshot = await articlesRef.get();
  const articles = snapshot.docs.map((doc) => doc.data());
  /*
  const articles = snapshot.docs.map((doc) => ({
    title: doc.data().title,
    description: doc.data().description,
    content: doc.data().content,
  }));
*/

  return articles;
}

module.exports = { save, getArticles };
