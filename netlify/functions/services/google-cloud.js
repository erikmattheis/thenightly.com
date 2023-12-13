// const path = require('path');
// const gm = require('gm').subClass({ imageMagick: true });
const { Storage } = require('@google-cloud/storage');

// Load your service account credentials from an environment variable or secret manager

function sanitizeId(id) {
  return encodeURIComponent(id.toLowerCase().replace(/\s/g, '-'));
}

const storage = new Storage();
/*
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

    await file.makePublic();

    // const compressedFilename = filename.replace('.jpg', `-${smallerSize}.jpg`);

    const googleCloudCompressedFilename = `${fileGroupName}/${smallerSize}/${filename}`;

    const gmImageQualities = [30, 40, 50, 60, 70];
    const gmImageQuality = gmImageQualities[Math.floor(Math.random() * gmImageQualities.length)];

    const smallCompressedBuffer = gm(buffer).quality(gmImageQuality).resize(smallerSize).toBuffer();

    const googleCloudSmallFilename = `${fileGroupName}/${smallerSize}/${filename}`;

    const smallFile = storage.bucket(bucketName).file(googleCloudSmallFilename);

    await smallFile.save(smallCompressedBuffer, { contentType: 'image/jpeg' });

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${googleCloudCompressedFilename}`;
    /*
    // Save the image URL in Firestore

    const docRef = db.collection(collection).doc(docId);
    await docRef.set({ imageUrl: publicUrl }, { merge: true });

    console.log('Image saved to Firestore');
*
    return publicUrl;
  } catch (error) {
    console.error('Error saving image to Google Cloud:', error);
    return `Error saving image to Google Cloud: ${error}`;
  }
}

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
    });

    stream.write(buffer);
    stream.end();

    return new Promise((resolve, reject) => {
      stream.on('error', reject);
      stream.on('finish', resolve);
    });
  } catch (error) {
    console.error('Error saving image to Google Cloud:', error);
    return `Error saving image to Google Cloud: ${error}`;
  }
}

module.exports = { saveImage };
