const axios = require('axios');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const { saveImage } = require('./services/firestore');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt, model, n, size) {
  const response = await openai.images.generate({
    prompt,
    model,
    n,
    size,
  });
  return response.data;
}

async function saveImageToFile(image, imagePath) {
  const imageBuffer = await axios.get(image, {
    responseType: 'arraybuffer',
  });

  fs.writeFileSync(path.join(__dirname, imagePath), imageBuffer.data);
}

function replaceWhiteSpaceWithDash(imageName) {
  return imageName.replace(/\s+/g, '-');
}

exports.handler = async function handler(prompt, imageName, model = 'dall-e-2', n = 1, size = '1024x1024') {
  const imageBuffer = await generateImage(prompt, model, n, size);

  await saveImage('articles', imageBuffer, imageName);

  const imageNameWithDash = replaceWhiteSpaceWithDash(imageName);

  const imagePath = `./data/images/${imageNameWithDash}.jpg`;

  await saveImageToFile(imageBuffer, imagePath);

  return `${imageName}.jpg`;
};
