// functions/savecontent.js
// const dotenv = require('dotenv');
//

/*
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
*/
/*
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
console.log('serviceAccount', serviceAccount);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

exports.handler = async (event) => {
  const { title, description, content } = JSON.parse(event.body);

  if (!title || !description || !content) {
    return {
      statusCode: 400,
      body: 'Request must include title, description, and content',
    };
  }

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
*/
