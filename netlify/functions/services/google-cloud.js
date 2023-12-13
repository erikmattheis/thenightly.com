// const path = require('path');
// const gm = require('gm').subClass({ imageMagick: true });
const { Storage } = require('@google-cloud/storage');

// Load your service account credentials from an environment variable or secret manager

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

function sanitizeId(id) {
  return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'));
}

const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: serviceAccount,
});

/*

async function saveImage(buffer, name) {
  console.log('Saving image to Google Cloud...');
  try {
    const bucketName = 'thenightly';
    const fileGroupName = 'article-images';
    const fileName = sanitizeId(name);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`${fileGroupName}/${fileName}`);

    await bucket.upload(buffer, {
      destination: file,
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileGroupName}${fileName}`;

    return publicUrl;
  } catch (error) {
    console.error('Error saving image to Google Cloud:', error);
    return `Error saving image to Google Cloud: ${error}`;
  }
}

module.exports = { saveImage };

*/

async function saveImage(buffer, name) {
  console.log('Saving image to Google Cloud...');
  try {
    // Upload the image data to Google Cloud Storage
    const bucketName = 'thenightly';
    const fileGroupName = 'article-images';
    const fileName = sanitizeId(name);

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`${fileGroupName}/${fileName}`);
    const stream = file.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
      },
      public: true,
    });

    stream.write(buffer);
    stream.end();

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileGroupName}${fileName}`;

    return publicUrl;
  } catch (error) {
    console.error('Error saving image to Google Cloud:', error);
    return `Error saving image to Google Cloud: ${error}`;
  }
}

module.exports = { saveImage };
