// const path = require('path');
const admin = require('firebase-admin');
const { sanitizeId } = require('./utility');

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

async function saveArticle(collection, doc, id = null) {
  console.log('Saving to Firestore...', collection);
  try {
    // Add a new document with a generated id to the 'messages' collection
    let docId;
    if (id) {
      docId = id;
    } else {
      docId = sanitizeId(`${doc.batch}-${doc.input.topic}`);
    }

    const docRef = db.collection(collection).doc(docId);
    const timestamp = admin.firestore.Timestamp.now();
    const sav = await docRef.set({ ...doc, timestamp });
    console.log('sav', JSON.stringify(sav, null, 2));

    const result = await docRef.get();
    return result.data();
  } catch (error) {
    return `Error adding document: ${error}`;
  }
}

async function getArticlesByBatch(name) {
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

async function getArticlesByCollectionAndBatch(collection, batch) {
  const articlesRef = db.collection(collection); // .orderBy('topic', 'asc');
  const snapshot = await articlesRef.get();
  const articles = snapshot.docs.filter((doc) => doc.data().batch === batch).map((doc) => doc.data());

  return articles;
}

module.exports = { saveArticle, getArticlesByBatch, getArticlesByCollectionAndBatch };
