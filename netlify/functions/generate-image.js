const axios = require('axios');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

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

exports.handler = async function handler(prompt, imageName, model = 'dall-e-2', n = 1, size = '512x512') {
  const images = await generateImage(prompt, model, n, size);
  console.log('image: ', JSON.stringify(images, null, 2));
  const safeName = replaceWhiteSpaceWithDash(imageName);
  const imagePath = `../../public/assets/photos/${safeName}.jpg`;
  await saveImageToFile(images[0].url, imagePath);

  return `${imageName}.jpg`;
};
