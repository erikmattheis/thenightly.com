const path = require('path');
const admin = require('firebase-admin');
const gm = require('gm').subClass({ imageMagick: true });

const { Storage } = require('@google-cloud/storage');

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
  return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'));
}

async function saveArticle(collection, doc) {
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

const storage = new Storage();

async function saveImage(buffer, name) {
  console.log('Saving image to ..google cloud...');
  try {
    // Upload the image data to Google Cloud Storage
    const bucketName = 'thenightly';
    const fileGroupName = 'article-images';
    const smallerSize = 698;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // slash is organizational delimiter used by google cloud storage
    const filename = sanitizeId(`${name}-${year}-${month}-${day}.jpg`);
    // const filename = sanitizeId(`${name}-${year}-${month}-${day}.jpg`);

    const googleCloudFilename = `${fileGroupName}/${filename}`;

    const file = storage.bucket(bucketName).file(googleCloudFilename);
    await file.save(buffer, { contentType: 'image/jpeg' });

    const compressedFilename = name.replace('.jpg', '-${smallerSize}.jpg');

    const googleCloudCompressedFilename = `${fileGroupName}/${compressedFilename}`;

    const smallCompressedBuffer = gm(buffer).quality(5).resize(smallerSize).toBuffer();

    await compressedFile.save(smallCompressedBuffer, { contentType: 'image/jpeg' });

    // Get the public URL of the uploaded image
    await file.makePublic();

    const compressedFile = storage.bucket(bucketName).file(googleCloudCompressedFilename);

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${googleCloudCompressedFilename}`;

    // Save the image URL in Firestore

    const docRef = db.collection(collection).doc(docId);
    await docRef.set({ imageUrl: publicUrl }, { merge: true });

    console.log('Image saved to Firestore');

    return publicUrl;
  } catch (error) {
    console.error('Error saving image to Firestore:', error);
    return `Error saving image to Firestore: ${error}`;
  }
}

module.exports = { saveArticle, saveImage, getArticles };
