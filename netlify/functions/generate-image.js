const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const sharp = require('sharp');

const { saveImage } = require('./services/google-cloud');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt, model, n, size) {
  try {
    const response = await openai.images.generate({
      prompt,
      model,
      n,
      size,
      response_format: 'b64_json',
    });
    return response.data[0];
  } catch (error) {
    console.log('Error generating image:', error);
    return `Error generating image: ${error}`;
  }
}

async function saveImageBufferToFile(imageBuffer, imagePath) {
  fs.writeFileSync(path.join(__dirname, imagePath), imageBuffer);
}

function replaceWhiteSpaceWithDash(imageName) {
  return imageName.replace(/\s+/g, '-');
}

exports.handler = async function handler(prompt, imageStr, model = 'dall-e-2', n = 1, size = '512x512') {
  const image = await generateImage(prompt, model, n, size);

  const buffer = Buffer.from(image.b64_json, 'base64');

  console.log('buffer type received:', typeof buffer);

  const imageUrl = await saveImage(buffer, imageStr);

  const imageName = imageUrl.split('/').slice(-1)[0];

  const images = [20, 40, 60, 80, 90].map(async (quality) => {
    console.log('buffer type:', typeof buffer);

    const compressedBuffer = await sharp(buffer)
      .jpeg({ quality })
      .toBuffer();

    const compressedFilename = imageName.replace('.jpg', `-q${quality}.jpg`);

    await saveImage(compressedBuffer, compressedFilename);

    return compressedFilename;
  });

  const imageNameWithDash = replaceWhiteSpaceWithDash(imageName);

  const imagePath = `../../public/images/${imageNameWithDash}.jpg`;

  await saveImageBufferToFile(buffer, imagePath);

  return [...images, imagePath];
};
